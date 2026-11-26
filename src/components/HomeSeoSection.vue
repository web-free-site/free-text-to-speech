<template>
  <article
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/50 p-6 sm:p-8 prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
    aria-labelledby="seo-guide-heading"
  >
    <h2 id="seo-guide-heading" class="text-xl font-bold text-gray-900 dark:text-gray-100 !mt-0">
      Free text to speech online — natural voices in your browser
    </h2>
    <p>
      This <strong>free text to speech</strong> tool turns typed or pasted writing into spoken audio using
      Piper neural voices. You do not need an account, a cloud API key, or desktop software. Open the page,
      enter your script, pick English or French, adjust speed, and listen instantly. When you are happy with
      the result, download a standard 16-bit PCM WAV file for podcasts, video narration, accessibility
      workflows, or study sessions.
    </p>

    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">What this tool does</h3>
    <p>
      Free Text to Speech runs Piper inside a Web Worker with ONNX Runtime WebAssembly. Your words are split
      into chunks, converted to phonemes, and synthesized locally. Playback streams chunk by chunk so long
      passages start speaking before the full file is finished. Voice models are fetched from Hugging Face
      only the first time you use a voice; after that they stay in your browser cache (IndexedDB) so repeat
      visits are faster. The interface shows word and character counts, lets you preview each voice with a
      short sample, and exports one WAV that most editors and phones accept without conversion.
    </p>

    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">How to use it — step by step</h3>
    <ol class="list-decimal pl-5 space-y-2">
      <li>
        <strong>Paste or type your text</strong> in the main box. Drafts, lecture notes, product copy, and
        subtitles all work. Use the copy button if you need to grab the text again elsewhere.
      </li>
      <li>
        <strong>Choose a voice</strong> from the English (LJ Speech, Joe) or French (MLS) options. Tap
        preview on a voice if you want to hear a one-line sample before generating the full passage.
      </li>
      <li>
        <strong>Set reading speed</strong> with the slider. Slower speech helps language learners; slightly
        faster speech can match short-form video pacing.
      </li>
      <li>
        Click <strong>Generate</strong> (or Play on a later pass) to synthesize audio. The first run for a
        new voice may show a download progress bar while the model loads.
      </li>
      <li>
        Listen in the tab, then click <strong>Download WAV</strong> to save <code>speech.wav</code> to your
        device for editing in Audacity, DaVinci Resolve, iMovie, or any DAW.
      </li>
    </ol>
    <p>
      For a longer walkthrough, see our
      <a href="/how-to-convert-text-to-speech-in-the-browser/" class="text-blue-600 dark:text-blue-400"
        >how to convert text to speech in the browser</a
      >
      guide on this site, or the hub article
      <a
        href="https://web-free.site/guides/text-to-speech-wav-download-free/"
        class="text-blue-600 dark:text-blue-400"
        rel="noopener"
        >text to speech free with WAV download</a
      >
      on
      <a href="https://web-free.site/?ref=free-text-to-speech" class="text-blue-600 dark:text-blue-400" rel="noopener"
        >web-free.site</a
      >.
    </p>

    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Privacy and in-browser processing</h3>
    <p>
      Your manuscript is not uploaded to our servers for synthesis. Inference happens on your CPU or GPU in
      the tab, which means drafts that include names, internal URLs, or unreleased product wording stay on
      your machine during TTS. The only routine network calls are loading the site assets, fetching Piper
      voice files from Hugging Face when needed, and standard ad scripts that fund hosting. We do not operate
      a login or store your text in a user database. Clearing site data removes cached models if you want to
      free disk space. For details on ads and cookies, read the
      <a href="/privacy/" class="text-blue-600 dark:text-blue-400">privacy policy</a>.
    </p>

    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Common use cases</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li>
        <strong>Accessibility:</strong> Hear articles, homework, or documentation read aloud when reading on
        screen is tiring or impractical.
      </li>
      <li>
        <strong>Video and slides:</strong> Draft narration for tutorials, explainers, or training decks, then
        align the WAV in your editor. Pair with
        <a href="/how-to-make-a-voiceover-for-a-video-with-text-to-speech/" class="text-blue-600 dark:text-blue-400"
          >our video voiceover guide</a
        >
        for timing tips.
      </li>
      <li>
        <strong>Language practice:</strong> Compare English and French voices at different speeds while
        following along with the on-screen text.
      </li>
      <li>
        <strong>Proofreading:</strong> Listening often catches duplicated words, awkward phrasing, or missing
        punctuation that silent reading skips.
      </li>
      <li>
        <strong>Quick audio drafts:</strong> Prototype podcast intros, IVR prompts, or app copy before
        committing to a human studio session.
      </li>
    </ul>
    <p>
      Piper voices on this site are chosen from the
      <a
        href="https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md"
        class="text-blue-600 dark:text-blue-400"
        rel="noopener"
        >commercial-use list</a
      >, but your project may still need to credit the underlying dataset. Check
      <a href="/about/" class="text-blue-600 dark:text-blue-400">About</a> before publishing monetized content.
      Explore more utilities that run entirely in the browser on
      <a href="https://web-free.site/?ref=free-text-to-speech" class="text-blue-600 dark:text-blue-400" rel="noopener"
        >web-free.site</a
      >.
    </p>
  </article>
</template>