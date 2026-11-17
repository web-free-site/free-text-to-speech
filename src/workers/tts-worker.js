import { PiperTTS, TextSplitterStream } from '../lib/piper-tts.js';
import { COMMERCIAL_VOICES, getVoiceById } from '../config/commercial-voices.js';

let tts = null;
let loadedVoiceId = null;

function voiceListForUi() {
  return COMMERCIAL_VOICES.map((v) => ({
    id: v.id,
    name: v.name,
    language: v.language,
  }));
}

async function loadVoice(voiceId, onProgress) {
  const voice = getVoiceById(voiceId);
  if (!voice) {
    throw new Error(`Unknown voice: ${voiceId}`);
  }
  if (tts && loadedVoiceId === voiceId) {
    return;
  }
  tts = await PiperTTS.from_pretrained(voice.modelPath, voice.configPath, {
    onProgress: (p) => {
      self.postMessage({
        status: 'download',
        voiceId,
        ...p,
      });
    },
  });
  loadedVoiceId = voiceId;
}

async function initializeWorker() {
  self.postMessage({
    status: 'ready',
    voices: voiceListForUi(),
    defaultVoice: COMMERCIAL_VOICES[0].id,
  });
}

async function handlePreview(text, voiceId, speed) {
  await loadVoice(voiceId, () => {});
  const streamer = new TextSplitterStream();
  streamer.push(text);
  streamer.close();

  const lengthScale = 1.0 / (speed || 1.0);

  const stream = tts.stream(streamer, {
    speakerId: 0,
    lengthScale,
  });

  for await (const { audio } of stream) {
    self.postMessage({ status: 'preview', audio: audio.toBlob() });
    break;
  }
}

self.addEventListener('message', async (e) => {
  const { type, text, voice, speed } = e.data;

  if (type === 'init') {
    await initializeWorker();
    return;
  }

  if (type === 'preview') {
    try {
      await handlePreview(text, voice, speed);
    } catch (error) {
      console.error('Preview error:', error);
      self.postMessage({ status: 'error', data: error.message });
    }
    return;
  }

  if (!text) {
    self.postMessage({ status: 'error', data: 'No text provided' });
    return;
  }

  const voiceId = voice || COMMERCIAL_VOICES[0].id;

  try {
    self.postMessage({ status: 'loading-voice', voiceId });
    await loadVoice(voiceId);
  } catch (error) {
    console.error('Error loading voice:', error);
    self.postMessage({ status: 'error', data: error.message });
    return;
  }

  const streamer = new TextSplitterStream();
  streamer.push(text);
  streamer.close();

  const lengthScale = 1.0 / (speed || 1.0);

  const stream = tts.stream(streamer, {
    speakerId: 0,
    lengthScale,
  });
  const chunks = [];

  try {
    for await (const { text: chunkText, audio } of stream) {
      self.postMessage({
        status: 'stream',
        chunk: {
          audio: audio.toBlob(),
          text: chunkText,
        },
      });
      chunks.push(audio);
    }
  } catch (error) {
    console.error('Error during streaming:', error);
    self.postMessage({ status: 'error', data: error.message });
    return;
  }

  let audio;
  if (chunks.length > 0) {
    try {
      const originalSamplingRate = chunks[0].sampling_rate;
      const length = chunks.reduce((sum, chunk) => sum + chunk.audio.length, 0);
      const waveform = new Float32Array(length);
      let offset = 0;
      for (const { audio: chunkAudio } of chunks) {
        waveform.set(chunkAudio, offset);
        offset += chunkAudio.length;
      }

      normalizePeak(waveform, 0.9);
      const trimmed = trimSilence(
        waveform,
        0.002,
        Math.floor(originalSamplingRate * 0.02)
      );

      audio = new chunks[0].constructor(trimmed, originalSamplingRate);
    } catch (error) {
      console.error('Error processing audio chunks:', error);
      self.postMessage({ status: 'error', data: error.message });
      return;
    }
  }

  self.postMessage({ status: 'complete', audio: audio?.toBlob() });
});

function normalizePeak(f32, target = 0.9) {
  if (!f32?.length) return;
  let max = 1e-9;
  for (let i = 0; i < f32.length; i++) max = Math.max(max, Math.abs(f32[i]));
  const g = Math.min(4, target / max);
  if (g < 1) {
    for (let i = 0; i < f32.length; i++) f32[i] *= g;
  }
}

function trimSilence(f32, thresh = 0.002, minSamples = 480) {
  let s = 0;
  let e = f32.length - 1;
  while (s < e && Math.abs(f32[s]) < thresh) s++;
  while (e > s && Math.abs(f32[e]) < thresh) e--;
  s = Math.max(0, s - minSamples);
  e = Math.min(f32.length, e + minSamples);
  return f32.slice(s, e);
}