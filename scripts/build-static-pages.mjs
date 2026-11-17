import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageHtml } from './static-page-shell.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const pages = [
  {
    dir: 'how-to-convert-text-to-speech-in-the-browser',
    path: '/how-to-convert-text-to-speech-in-the-browser/',
    title: 'How to Convert Text to Speech in the Browser | Free Text to Speech',
    description:
      'Step-by-step guide to turning typed text into natural speech with Piper ONNX models that run entirely in your web browser.',
    body: `
      <h1>How to convert text to speech in the browser</h1>
      <p>You can synthesize speech without uploading text to a server. Free Text to Speech loads Piper voice models from Hugging Face into your browser, runs inference with WebAssembly, and plays or downloads the result locally.</p>
      <ol>
        <li>Open <a href="/">Free Text to Speech</a> on a modern Chromium, Firefox, or Safari browser.</li>
        <li>Paste or type the text you want to hear in the editor.</li>
        <li>Choose a voice (English or French). The first time you generate speech for a voice, the model downloads with a progress bar and is cached in IndexedDB.</li>
        <li>Adjust reading speed if needed, then click <strong>Generate</strong> and <strong>Play</strong>.</li>
        <li>Use <strong>Download WAV</strong> to save the audio file.</li>
      </ol>
      <h2>FAQ</h2>
      <dl class="faq">
        <dt>Is my text sent to a server?</dt>
        <dd>No. Synthesis runs on your device after models are downloaded.</dd>
        <dt>Why is the first generation slow?</dt>
        <dd>Voice ONNX files are large (tens of MB). Later visits reuse the cache.</dd>
        <dt>Which languages are supported?</dt>
        <dd>English (US) and French voices are available on this site.</dd>
      </dl>
    `,
  },
  {
    dir: 'how-to-download-text-to-speech-as-a-wav-file',
    path: '/how-to-download-text-to-speech-as-a-wav-file/',
    title: 'How to Download Text to Speech as a WAV File | Free Text to Speech',
    description:
      'Export browser-generated speech as a standard WAV audio file after synthesizing with Piper TTS.',
    body: `
      <h1>How to download text to speech as a WAV file</h1>
      <p>After you generate audio on the home page, the tool merges chunks into one waveform and encodes a 16-bit PCM WAV file you can save like any other download.</p>
      <ol>
        <li>Enter your script and pick a voice on the <a href="/">home page</a>.</li>
        <li>Click <strong>Generate</strong> and wait until playback is ready.</li>
        <li>Press <strong>Download WAV</strong>. Your browser saves <code>audio.wav</code> (rename after saving if you like).</li>
      </ol>
      <p>WAV is uncompressed and works in video editors, presentation software, and accessibility workflows without extra conversion.</p>
      <h2>FAQ</h2>
      <dl class="faq">
        <dt>Can I use the file commercially?</dt>
        <dd>Check each voice&apos;s dataset license on our <a href="/about/">About</a> page and Piper&apos;s commercial-use list.</dd>
        <dt>Does download work on mobile?</dt>
        <dd>Yes on current mobile browsers; use a shorter test phrase if storage or memory is limited.</dd>
      </dl>
    `,
  },
  {
    dir: 'about',
    path: '/about/',
    title: 'About Free Text to Speech',
    description:
      'Browser-based Piper TTS rebrand with commercial-use English and French voices, Apache-2.0 upstream demo, and web-free.site hub.',
    body: `
      <h1>About</h1>
      <p><strong>Free Text to Speech</strong> (<a href="https://free-text-to-speech.web-free.site">free-text-to-speech.web-free.site</a>) lets you type text, hear it, and download WAV audio with no account and no server-side synthesis.</p>
      <h2>Upstream project</h2>
      <p>This site is derived from <a href="https://github.com/clowerweb/piper-tts-web-demo">clowerweb/piper-tts-web-demo</a>, licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>. The original LICENSE file is included in our repository.</p>
      <h2>Voices we offer</h2>
      <ul>
        <li><strong>en_US-ljspeech-medium</strong> — public domain (LJ Speech). <a href="https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/ljspeech/medium">Hugging Face</a></li>
        <li><strong>en_US-joe-medium</strong> — CC0. <a href="https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/joe/medium">Hugging Face</a></li>
        <li><strong>fr_FR-mls-medium</strong> — CC BY 4.0 (MLS). Attribution in MODEL_CARD when redistributing audio derived from training data.</li>
      </ul>
      <p>We do not ship lessac-, libritts-, or Swahili (lanfrica) voices because they are not on Piper&apos;s commercial-use list.</p>
      <h2>Piper &amp; datasets</h2>
      <p>Neural inference uses <a href="https://github.com/OHF-Voice/piper1-gpl">Piper</a> and models from <a href="https://huggingface.co/rhasspy/piper-voices">rhasspy/piper-voices</a>. See <a href="https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md">commercial-use documentation</a> for licensing context.</p>
      <p>Part of the <a href="https://web-free.site">web-free.site</a> collection of free browser tools.</p>
    `,
  },
  {
    dir: 'contact',
    path: '/contact/',
    title: 'Contact | Free Text to Speech',
    description: 'How to reach the maintainers of Free Text to Speech on web-free.site.',
    body: `
      <h1>Contact</h1>
      <p>Free Text to Speech is maintained as part of the <a href="https://web-free.site">web-free.site</a> project hub.</p>
      <p>For bugs in the upstream web demo, see <a href="https://github.com/clowerweb/piper-tts-web-demo/issues">piper-tts-web-demo issues</a>. For voice licensing questions, consult Piper&apos;s <a href="https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/LICENSING.md">licensing guide</a> and each voice MODEL_CARD on Hugging Face.</p>
      <p>Hosting and site issues: open an issue in the <code>web-free-site/free-text-to-speech</code> repository on GitHub if you have access, or use the contact options listed on <a href="https://web-free.site">web-free.site</a>.</p>
    `,
  },
  {
    dir: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy | Free Text to Speech',
    description: 'Privacy practices for Free Text to Speech: local synthesis, IndexedDB cache, and third-party ads.',
    body: `
      <h1>Privacy policy</h1>
      <p><em>Last updated: November 2026</em></p>
      <h2>Text and audio</h2>
      <p>Your typed text is processed in the browser for speech synthesis. We do not operate a backend that receives your content for TTS.</p>
      <h2>Local storage</h2>
      <p>Downloaded Piper model files may be stored in IndexedDB on your device to speed up repeat visits. You can clear site data in your browser to remove them.</p>
      <h2>Third parties</h2>
      <p>We use Adsterra for advertising; those partners may set cookies or collect usage data under their policies. Voice models are fetched from Hugging Face when you first use a voice.</p>
      <h2>Contact</h2>
      <p>Questions: see our <a href="/contact/">contact page</a>.</p>
    `,
  },
  {
    dir: 'terms',
    path: '/terms/',
    title: 'Terms of Use | Free Text to Speech',
    description: 'Terms for using Free Text to Speech, voice licenses, and acceptable use.',
    body: `
      <h1>Terms of use</h1>
      <p>By using Free Text to Speech you agree to use the tool lawfully. The service is provided &quot;as is&quot; without warranties.</p>
      <h2>Voice output</h2>
      <p>You are responsible for complying with the licenses of the Piper voices you select. Some datasets require attribution (for example CC BY).</p>
      <h2>Prohibited use</h2>
      <p>Do not use generated audio for fraud, harassment, or impersonation without consent. Do not attempt to disrupt the site or abuse ad inventory.</p>
      <h2>Upstream software</h2>
      <p>Apache-2.0 and other open-source licenses apply to included software; see the repository LICENSE and voice MODEL_CARD files.</p>
    `,
  },
];

for (const p of pages) {
  const outDir = path.join(publicDir, p.dir);
  fs.mkdirSync(outDir, { recursive: true });
  const html = pageHtml({
    title: p.title,
    description: p.description,
    path: p.path,
    bodyHtml: p.body,
  });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log('Wrote', p.dir);
}