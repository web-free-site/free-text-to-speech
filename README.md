# Free Text to Speech

Browser-based [Piper](https://github.com/OHF-Voice/piper1-gpl) text-to-speech, derived from [clowerweb/piper-tts-web-demo](https://github.com/clowerweb/piper-tts-web-demo) (Apache-2.0).

- Voices load at runtime from [rhasspy/piper-voices](https://huggingface.co/rhasspy/piper-voices) (commercial-use selection) with IndexedDB caching
- English (`en_US-ljspeech-medium`, `en_US-joe-medium`) and French (`fr_FR-mls-medium`)
- Speed control, playback, WAV download
- Static Cloudflare Workers assets (`wrangler.toml`); `npm run build` outputs `dist/`

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

See `LICENSE` for Apache-2.0 terms from the upstream demo.