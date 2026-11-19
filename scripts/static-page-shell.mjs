/** Build helper to emit prerendered HTML pages (run via `node scripts/build-static-pages.mjs`). */
export function pageHtml({ title, description, path, bodyHtml, extraJsonLd = '' }) {
  const canonical = `https://free-text-to-speech.web-free.site${path}`;
  const ogImage = 'https://free-text-to-speech.web-free.site/og-default.svg';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:site_name" content="Free Text to Speech" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <link rel="stylesheet" href="/css/site-pages.css" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": ${JSON.stringify(title)},
    "description": ${JSON.stringify(description)},
    "url": ${JSON.stringify(canonical)}
  }
  </script>
  ${extraJsonLd}
  <script src="https://abscloud.org/1/146c0533e5bf7c66701c026e09054d59" async></script>
  <script src="https://bauval.org/14/01bf93e337253e538c862d474ceb8029" async></script>
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <h1><a href="/">Free Text to Speech</a></h1>
      <p>Neural text-to-speech in your browser — private, free, no account.</p>
    </div>
  </header>
  <main class="wrap">
    ${bodyHtml}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <nav aria-label="Footer">
        <a href="/">Home</a>
        <a href="/how-to-convert-text-to-speech-in-the-browser/">How-to</a>
        <a href="/how-to-download-text-to-speech-as-a-wav-file/">WAV download</a>
        <a href="/about/">About</a>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="https://web-free.site" rel="noopener">web-free.site</a>
      </nav>
      <p>Based on <a href="https://github.com/clowerweb/piper-tts-web-demo">piper-tts-web-demo</a> (Apache-2.0) and <a href="https://github.com/OHF-Voice/piper1-gpl">Piper</a>.</p>
      <p class="smartlink"><a href="https://araplhn.org/4/8e9692ad8e601d8db5d1e68c49920175" rel="nofollow sponsored">Partnership link</a></p>
    </div>
  </footer>
<script src="/wf-ads.js" defer></script>
</body>
</html>`;
}