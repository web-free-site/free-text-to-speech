<script setup>
const siteUrl = 'https://free-text-to-speech.web-free.site';
</script>

<template>
  <footer class="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/60 mt-12">
    <div class="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600 dark:text-gray-400 space-y-6">
      <nav class="flex flex-wrap gap-x-4 gap-y-2 justify-center" aria-label="Footer">
        <a :href="`${siteUrl}/how-to-convert-text-to-speech-in-the-browser/`" class="hover:text-blue-600">How to convert text to speech</a>
        <a :href="`${siteUrl}/how-to-download-text-to-speech-as-a-wav-file/`" class="hover:text-blue-600">Download as WAV</a>
        <a :href="`${siteUrl}/how-to-make-a-voiceover-for-a-video-with-text-to-speech/`" class="hover:text-blue-600">Video voiceover</a>
        <a :href="`${siteUrl}/about/`" class="hover:text-blue-600">About</a>
        <a :href="`${siteUrl}/contact/`" class="hover:text-blue-600">Contact</a>
        <a :href="`${siteUrl}/privacy/`" class="hover:text-blue-600">Privacy</a>
        <a :href="`${siteUrl}/terms/`" class="hover:text-blue-600">Terms</a>
      </nav>

      <div class="max-w-3xl mx-auto text-center space-y-3 leading-relaxed">
        <p>
          Free Text to Speech is based on
          <a href="https://github.com/clowerweb/piper-tts-web-demo" class="text-blue-600 hover:underline" rel="noopener">piper-tts-web-demo</a>
          (Apache-2.0). Speech synthesis uses
          <a href="https://github.com/OHF-Voice/piper1-gpl" class="text-blue-600 hover:underline" rel="noopener">Piper</a>
          with voices from
          <a href="https://huggingface.co/rhasspy/piper-voices" class="text-blue-600 hover:underline" rel="noopener">rhasspy/piper-voices</a>
          (commercial-use selections per
          <a href="https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/COMMERCIAL_USE.md" class="text-blue-600 hover:underline" rel="noopener">Piper commercial-use guidance</a>).
        </p>
        <p>
          More free browser tools:
          <a href="https://web-free.site" class="text-blue-600 hover:underline" rel="noopener">web-free.site</a>
        </p>
      </div>
      <p class="text-center text-xs text-gray-500">© {{ new Date().getFullYear() }} Free Text to Speech</p>
    </div>
  </footer>
</template>