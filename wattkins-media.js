(() => {
  function injectWattkinsMedia() {
    const watt = [...document.querySelectorAll('article.case')].find(card => card.querySelector('h3')?.textContent.trim() === 'Wattkins');
    if (!watt || watt.querySelector('.wattkins-media-update')) return;
    const style=document.createElement('style');
    style.textContent='@media(max-width:520px){.wattkins-media-update{grid-template-columns:1fr!important}.wattkins-media-update video{max-height:560px!important}}';
    document.head.appendChild(style);
    const gallery = document.createElement('div');
    gallery.className = 'wattkins-media-update';
    gallery.style.cssText = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start;margin:18px 0';
    gallery.innerHTML = `
      <figure style="margin:0"><img src="/assets/wattkins-sidekick.webp" alt="Wattkins animated companion character concept" loading="lazy" style="width:100%;height:auto;border-radius:14px;display:block" /></figure>
      <figure style="margin:0"><img src="/assets/wattkins-today.webp" alt="Wattkins daily check-in interface" loading="lazy" style="width:100%;height:auto;border-radius:14px;display:block" /></figure>
      <video controls loop muted playsinline preload="metadata" poster="/assets/wattkins-sidekick.webp" aria-label="Wattkins breathing animation" style="width:100%;max-height:480px;object-fit:contain;border-radius:14px;grid-column:1/-1">
        <source src="/assets/wattkins-breath.mp4" type="video/mp4" />
      </video>`;
    const video=gallery.querySelector('video');
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)video.autoplay=true;
    const media = watt.querySelector('.phone-row, .media-stack, .case-media, .case-visual');
    if (media) media.replaceWith(gallery);
    else watt.querySelector('.case-copy')?.appendChild(gallery);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',injectWattkinsMedia);
  else injectWattkinsMedia();
})();
