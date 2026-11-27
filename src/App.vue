<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import {
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  CopyIcon,
  CheckIcon,
} from 'lucide-vue-next';
import TextStatistics from './components/TextStatistics.vue';
import VoiceSelector from './components/VoiceSelector.vue';
import SpeedControl from './components/SpeedControl.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import AudioChunk from './components/AudioChunk.vue';
import SiteFooter from './components/SiteFooter.vue';
import HomeSeoSection from './components/HomeSeoSection.vue';
import AdBanner from './components/AdBanner.vue';
import ads from '../public/ads.json';

const text = ref(
  'Hello! Welcome to Free Text to Speech. Type anything here, pick a voice, and listen in your browser.'
);
const lastGeneration = ref(null);
const isPlaying = ref(false);
const currentChunkIndex = ref(-1);
const speed = ref(1);
const copied = ref(false);
const status = ref('loading');
const error = ref(null);
const worker = ref(null);
const voices = ref(null);
const selectedVoice = ref('en_US-ljspeech-medium');
const chunks = ref([]);
const result = ref(null);
const downloadProgress = ref(null);

const processed = computed(() => {
  return (
    lastGeneration.value &&
    lastGeneration.value.text === text.value &&
    lastGeneration.value.speed === speed.value &&
    lastGeneration.value.voice === selectedVoice.value
  );
});

const progressLabel = computed(() => {
  if (!downloadProgress.value) return '';
  const { label, loaded, total } = downloadProgress.value;
  const pct = total ? Math.round((loaded / total) * 100) : 0;
  return label === 'model' ? `Downloading voice model… ${pct}%` : `Downloading voice config… ${pct}%`;
});

const setSelectedVoice = (voice) => {
  selectedVoice.value = voice;
};

const setSpeed = (newSpeed) => {
  speed.value = newSpeed;
};

const handleVoicePreview = (voiceId) => {
  if (!worker.value || !voices.value) return;
  worker.value.postMessage({
    type: 'preview',
    text: 'Hello, this is a voice preview.',
    voice: voiceId,
    speed: speed.value,
  });
};

const restartWorker = () => {
  if (worker.value) {
    worker.value.terminate();
  }

  status.value = 'loading';
  voices.value = null;
  chunks.value = [];
  result.value = null;
  lastGeneration.value = null;
  isPlaying.value = false;
  currentChunkIndex.value = -1;
  downloadProgress.value = null;

  worker.value = new Worker(new URL('./workers/tts-worker.js', import.meta.url), {
    type: 'module',
  });

  worker.value.addEventListener('message', onMessageReceived);
  worker.value.addEventListener('error', onErrorReceived);
  worker.value.postMessage({ type: 'init' });
};

const handlePlayPause = () => {
  if (!isPlaying.value && status.value === 'ready' && !processed.value) {
    status.value = 'generating';
    chunks.value = [];
    currentChunkIndex.value = 0;
    const params = {
      text: text.value,
      voice: selectedVoice.value,
      speed: speed.value,
    };
    lastGeneration.value = params;
    worker.value?.postMessage(params);
  }
  if (currentChunkIndex.value === -1) {
    currentChunkIndex.value = 0;
  }
  isPlaying.value = !isPlaying.value;
};

const downloadAudio = () => {
  if (!result.value) return;
  const url = URL.createObjectURL(result.value);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'speech.wav';
  link.click();
  URL.revokeObjectURL(url);
};

const handleCopy = async () => {
  await navigator.clipboard.writeText(text.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const onMessageReceived = ({ data }) => {
  switch (data.status) {
    case 'ready':
      status.value = 'ready';
      voices.value = data.voices;
      if (data.defaultVoice) {
        selectedVoice.value = data.defaultVoice;
      }
      break;
    case 'download':
    case 'loading-voice':
      downloadProgress.value = {
        label: data.label || 'model',
        loaded: data.loaded || 0,
        total: data.total || 0,
      };
      if (data.status === 'loading-voice') {
        status.value = 'generating';
      }
      break;
    case 'error':
      status.value = 'error';
      error.value = data.data;
      downloadProgress.value = null;
      break;
    case 'stream':
      downloadProgress.value = null;
      chunks.value = [...chunks.value, data.chunk];
      break;
    case 'complete':
      status.value = 'ready';
      downloadProgress.value = null;
      result.value = data.audio;
      break;
    case 'preview':
      if (data.audio) {
        const audioUrl = URL.createObjectURL(data.audio);
        const audio = new Audio(audioUrl);
        audio.play().finally(() => setTimeout(() => URL.revokeObjectURL(audioUrl), 1000));
      }
      break;
    default:
      break;
  }
};

const onErrorReceived = (e) => {
  console.error('Worker error:', e);
  error.value = e.message || 'Worker error';
  status.value = 'error';
};

onMounted(() => {
  const nativeContainer = document.getElementById(ads.native.containerId);
  if (nativeContainer && !nativeContainer.dataset.loaded) {
    nativeContainer.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true;
    s.src = ads.native.script;
    nativeContainer.appendChild(s);
  }
  restartWorker();
});

onUnmounted(() => {
  worker.value?.terminate();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-800 transition-colors duration-300 pb-16 sm:pb-4">
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 class="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-300">
            <a href="/" class="hover:opacity-90">Free Text to Speech</a>
          </h1>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Piper TTS in your browser — no upload, WAV export</p>
        </div>
        <div class="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-2 hidden md:block">
      <AdBanner :slot-key="ads.banners['728x90']" :width="728" :height="90" label="Top banner" />
    </div>

    <main class="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-6">
      <div class="space-y-4 min-w-0">
        <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/50 p-5 space-y-5">
          <textarea
            v-model="text"
            placeholder="Type or paste your text here..."
            class="w-full min-h-[160px] text-base leading-relaxed resize-y p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-0"
          />

          <div class="flex justify-between items-center gap-2 flex-wrap">
            <TextStatistics :text="text" />
            <button
              type="button"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              :title="copied ? 'Copied' : 'Copy text'"
              @click="handleCopy"
            >
              <CheckIcon v-if="copied" class="w-4 h-4 text-green-500" />
              <CopyIcon v-else class="w-4 h-4" />
            </button>
          </div>

          <div v-if="voices" class="grid sm:grid-cols-2 gap-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-2">
              <span class="text-sm font-medium shrink-0">Voice</span>
              <VoiceSelector
                :voices="voices"
                :selected-voice="selectedVoice"
                @voice-change="setSelectedVoice"
                @voice-preview="handleVoicePreview"
              />
            </div>
            <SpeedControl :speed="speed" @speed-change="setSpeed" />
          </div>

          <div
            v-if="downloadProgress"
            class="text-sm text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-lg px-3 py-2"
          >
            {{ progressLabel }}
          </div>

          <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {{ error }}
          </div>

          <div
            v-else-if="!voices && status === 'loading'"
            class="flex items-center gap-2 text-gray-500 text-sm"
          >
            <span class="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
            Starting speech engine…
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-800 hover:bg-blue-900 disabled:opacity-50"
              :disabled="!text || (status !== 'ready' && status !== 'generating' && !chunks.length)"
              @click="handlePlayPause"
            >
              <PauseIcon v-if="isPlaying" class="w-5 h-5" />
              <PlayIcon v-else class="w-5 h-5" />
              <span v-if="isPlaying">Pause</span>
              <span v-else>{{ processed || status === 'generating' ? 'Play' : 'Generate' }}</span>
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 disabled:opacity-50"
              :disabled="!result || status !== 'ready'"
              @click="downloadAudio"
            >
              <DownloadIcon class="w-4 h-4" />
              Download WAV
            </button>
          </div>

          <div class="w-0 h-0 overflow-hidden">
            <AudioChunk
              v-for="(chunk, index) in chunks"
              :key="index"
              :audio="chunk.audio"
              :active="currentChunkIndex === index"
              :playing="isPlaying"
              @start="currentChunkIndex = index"
              @pause="isPlaying = false"
              @end="
                () => {
                  if (currentChunkIndex === chunks.length - 1) {
                    isPlaying = false;
                    currentChunkIndex = -1;
                  } else {
                    currentChunkIndex++;
                  }
                }
              "
            />
          </div>

          <p class="text-xs text-gray-500 dark:text-gray-400">
            Voices load from Hugging Face on first use and cache locally. English and French commercial-use models only.
          </p>
        </div>

        <div class="hidden sm:flex justify-center">
          <AdBanner :slot-key="ads.banners['468x60']" :width="468" :height="60" />
        </div>
        <div class="flex justify-center">
          <AdBanner :slot-key="ads.banners['300x250']" :width="300" :height="250" />
        </div>
        <div :id="ads.native.containerId" class="native-ad min-h-[80px] flex justify-center" />
        <div class="hidden md:flex justify-center">
          <AdBanner :slot-key="ads.banners['728x90']" :width="728" :height="90" label="Mid-page banner" />
        </div>

        <HomeSeoSection />

        <section
          class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/50 p-6 prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
          aria-labelledby="faq-heading"
        >
          <h2 id="faq-heading" class="text-lg font-semibold !mt-0">Frequently asked questions</h2>
          <dl>
            <dt class="font-medium mt-4">Is my text sent to a server for speech synthesis?</dt>
            <dd class="text-sm">
              No. Piper runs locally in your browser after voice models download from Hugging Face. Your
              passage is not uploaded for TTS processing.
            </dd>
            <dt class="font-medium mt-4">Which voices can I use?</dt>
            <dd class="text-sm">
              English (LJ Speech and Joe) and French (MLS), selected from Piper’s commercial-use list. Use
              preview to hear each voice before generating long text.
            </dd>
            <dt class="font-medium mt-4">Can I download the audio as a file?</dt>
            <dd class="text-sm">
              Yes. After generation finishes, use Download WAV to save a 16-bit PCM WAV file named
              speech.wav.
            </dd>
            <dt class="font-medium mt-4">Do I need an account or API key?</dt>
            <dd class="text-sm">
              No sign-up is required. The tool is free to use in a modern browser with JavaScript enabled.
            </dd>
            <dt class="font-medium mt-4">Can I use the WAV in commercial projects?</dt>
            <dd class="text-sm">
              It depends on the voice license and your use case. See
              <a href="/about/" class="text-blue-600 dark:text-blue-400">About</a> and Piper’s commercial-use
              documentation before publishing paid or monetized content.
            </dd>
          </dl>
        </section>
      </div>

      <aside class="hidden lg:flex flex-col gap-4 items-center">
        <AdBanner :slot-key="ads.banners['160x600']" :width="160" :height="600" />
        <AdBanner :slot-key="ads.banners['160x300']" :width="160" :height="300" />
      </aside>
    </main>

    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 py-1">
      <AdBanner :slot-key="ads.banners['320x50']" :width="320" :height="50" label="Mobile banner" />
    </div>

    <p class="text-center text-xs text-gray-500 py-2">
      <a :href="ads.smartlink" rel="nofollow sponsored" class="hover:underline">Sponsored link</a>
    </p>

    <SiteFooter />
  </div>
</template>