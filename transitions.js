(function () {
  // Inject the flash overlay
  const flash = document.createElement('div');
  flash.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:999',
    'pointer-events:none',
    'background:radial-gradient(circle at 50% 50%, rgba(255,248,220,0.92) 0%, rgba(201,168,76,0.55) 28%, rgba(8,7,3,0.85) 68%, #080703 100%)',
    'opacity:1',
    'transition:none',
  ].join(';');
  document.body.appendChild(flash);

  // Entry: start fully flashed, then fade out over ~1.4s
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flash.style.transition = 'opacity 1.4s ease-out';
      flash.style.opacity = '0';
    });
  });

  // Exit: intercept local link clicks — flash in, then navigate
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    e.preventDefault();
    flash.style.transition = 'opacity 0.38s ease-in';
    flash.style.opacity = '1';
    setTimeout(() => { window.location.href = href; }, 380);
  });
})();
