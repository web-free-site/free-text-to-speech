/**
 * Static HTML placed inside #root at build time for crawlers and no-JS users.
 * Vue replaces this subtree on mount (single H1 in the live app).
 */
export function getHomepagePrerenderInnerHtml() {
  return `
<div id="wf-static-shell" data-wf-prerender="homepage">
  <header>
    <h1>Free Text to Speech</h1>
    <p>Piper TTS in your browser — no upload, WAV export</p>
  </header>
  <main>
    <article aria-labelledby="seo-guide-heading">
      <h2 id="seo-guide-heading">Free text to speech online — natural voices in your browser</h2>
      <p>
        This <strong>free text to speech</strong> tool turns typed or pasted writing into spoken audio using
        Piper neural voices. You do not need an account, a cloud API key, or desktop software. Open the page,
        enter your script, pick English or French, adjust speed, and listen instantly. When you are happy with
        the result, download a standard 16-bit PCM WAV file for podcasts, video narration, accessibility
        workflows, or study sessions.
      </p>
      <h3>What this tool does</h3>
      <p>
        Free Text to Speech runs Piper inside a Web Worker with ONNX Runtime WebAssembly. Your words are split
        into chunks, converted to phonemes, and synthesized locally. Playback streams chunk by chunk so long
        passages start speaking before the full file is finished. Voice models are fetched from Hugging Face
        only the first time you use a voice; after that they stay in your browser cache (IndexedDB) so repeat
        visits are faster. The interface shows word and character counts, lets you preview each voice with a
        short sample, and exports one WAV that most editors and phones accept without conversion.
      </p>
      <h3>How to use it — step by step</h3>
      <ol>
        <li><strong>Paste or type your text</strong> in the main box. Drafts, lecture notes, product copy, and subtitles all work.</li>
        <li><strong>Choose a voice</strong> from the English (LJ Speech, Joe) or French (MLS) options. Use preview for a short sample.</li>
        <li><strong>Set reading speed</strong> with the slider for learners or faster video pacing.</li>
        <li>Click <strong>Generate</strong> (or Play on a later pass) to synthesize audio. The first run for a new voice may download the model.</li>
        <li>Listen in the tab, then click <strong>Download WAV</strong> to save speech.wav for any editor or DAW.</li>
      </ol>
      <p>
        For a longer walkthrough, see
        <a href="/how-to-convert-text-to-speech-in-the-browser/">how to convert text to speech in the browser</a>,
        or the hub article
        <a href="https://web-free.site/guides/text-to-speech-wav-download-free/">text to speech free with WAV download</a>
        on <a href="https://web-free.site/?ref=free-text-to-speech">web-free.site</a>.
      </p>
      <h3>Privacy and in-browser processing</h3>
      <p>
        Your manuscript is not uploaded to our servers for synthesis. Inference happens on your CPU or GPU in
        the tab. The only routine network calls are loading site assets, fetching Piper voice files from Hugging
        Face when needed, and standard ad scripts that fund hosting. We do not operate a login or store your text
        in a user database. For details on ads and cookies, read the <a href="/privacy/">privacy policy</a>.
      </p>
      <h3>Common use cases</h3>
      <ul>
        <li><strong>Accessibility:</strong> Hear articles, homework, or documentation read aloud.</li>
        <li><strong>Video and slides:</strong> Draft narration and align WAV in your editor; see <a href="/how-to-make-a-voiceover-for-a-video-with-text-to-speech/">our video voiceover guide</a>.</li>
        <li><strong>Language practice:</strong> Compare English and French voices at different speeds.</li>
        <li><strong>Proofreading:</strong> Listening catches duplicated words and awkward phrasing.</li>
        <li><strong>Quick audio drafts:</strong> Prototype podcast intros or app copy before studio time.</li>
      </ul>
      <p>
        Piper voices on this site are chosen from the
        <a href="https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md">commercial-use list</a>.
        Check <a href="/about/">About</a> before publishing monetized content. More browser tools:
        <a href="https://web-free.site/?ref=free-text-to-speech">web-free.site</a>.
      </p>
    </article>
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently asked questions</h2>
      <dl>
        <dt>Is my text sent to a server for speech synthesis?</dt>
        <dd>No. Piper runs locally in your browser after voice models download from Hugging Face. Your passage is not uploaded for TTS processing.</dd>
        <dt>Which voices can I use?</dt>
        <dd>English (LJ Speech and Joe) and French (MLS), selected from Piper's commercial-use list. Use preview to hear each voice before generating long text.</dd>
        <dt>Can I download the audio as a file?</dt>
        <dd>Yes. After generation finishes, use Download WAV to save a 16-bit PCM WAV file named speech.wav.</dd>
        <dt>Do I need an account or API key?</dt>
        <dd>No sign-up is required. The tool is free to use in a modern browser with JavaScript enabled.</dd>
        <dt>Can I use the WAV in commercial projects?</dt>
        <dd>It depends on the voice license and your use case. See <a href="/about/">About</a> and Piper's commercial-use documentation before publishing paid or monetized content.</dd>
      </dl>
    </section>
  </main>
</div>`.trim();
}

export const FAQ_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is my text sent to a server for speech synthesis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Piper runs locally in your browser after voice models download from Hugging Face. Your passage is not uploaded for TTS processing.",
      },
    },
    {
      "@type": "Question",
      name: "Which voices can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "English (LJ Speech and Joe) and French (MLS), selected from Piper's commercial-use list. Use preview to hear each voice before generating long text.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download the audio as a file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After generation finishes, use Download WAV to save a 16-bit PCM WAV file named speech.wav.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account or API key?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No sign-up is required. The tool is free to use in a modern browser with JavaScript enabled.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the WAV in commercial projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the voice license and your use case. See the About page and Piper commercial-use documentation before publishing paid or monetized content.",
      },
    },
  ],
};