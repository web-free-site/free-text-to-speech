/** Commercial-use Piper voices (see OHF-Voice/piper1-gpl COMMERCIAL_USE.md). Loaded from Hugging Face at runtime. */
export const HF_RESOLVE =
  'https://huggingface.co/rhasspy/piper-voices/resolve/main';

export const COMMERCIAL_VOICES = [
  {
    id: 'en_US-ljspeech-medium',
    name: 'English (US) — LJ Speech',
    language: 'English',
    license: 'Public domain (LJ Speech dataset)',
    sourceUrl: 'https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium',
    modelPath: `${HF_RESOLVE}/en/en_US/ljspeech/medium/en_US-ljspeech-medium.onnx`,
    configPath: `${HF_RESOLVE}/en/en_US/ljspeech/medium/en_US-ljspeech-medium.onnx.json`,
  },
  {
    id: 'en_US-joe-medium',
    name: 'English (US) — Joe',
    language: 'English',
    license: 'CC0',
    sourceUrl: 'https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/joe/medium',
    modelPath: `${HF_RESOLVE}/en/en_US/joe/medium/en_US-joe-medium.onnx`,
    configPath: `${HF_RESOLVE}/en/en_US/joe/medium/en_US-joe-medium.onnx.json`,
  },
  {
    id: 'fr_FR-mls-medium',
    name: 'French (FR) — MLS',
    language: 'French',
    license: 'CC BY 4.0 (MLS French)',
    sourceUrl: 'https://huggingface.co/rhasspy/piper-voices/tree/main/fr/fr_FR/mls/medium',
    modelPath: `${HF_RESOLVE}/fr/fr_FR/mls/medium/fr_FR-mls-medium.onnx`,
    configPath: `${HF_RESOLVE}/fr/fr_FR/mls/medium/fr_FR-mls-medium.onnx.json`,
  },
];

export function getVoiceById(id) {
  return COMMERCIAL_VOICES.find((v) => v.id === id);
}