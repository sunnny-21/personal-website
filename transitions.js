(function () {
  // Don't run on the home page — it has its own eclipse animation
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) return;

  // Respect the OS "reduce motion" setting — skip the fade entirely
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Inject a simple dark overlay
  const veil = document.createElement('div');
  veil.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:999',
    'pointer-events:none',
    'background:#080703',
    'opacity:1',
    'transition:none',
  ].join(';');
  document.body.appendChild(veil);

  // Entry: fade out over 0.5s (or appear instantly if motion is reduced)
  if (reduceMotion) {
    veil.style.opacity = '0';
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        veil.style.transition = 'opacity 0.5s ease-out';
        veil.style.opacity = '0';
      });
    });
  }

  // Back/forward button: browsers may restore this page from their cache
  // (bfcache) frozen in the dark "exiting" state. Snap the veil back to
  // clear when that happens so you never land on a black screen.
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      veil.style.transition = 'none';
      veil.style.opacity = '0';
    }
  });

  // Exit: fade in over 0.3s, then navigate
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    e.preventDefault();
    if (reduceMotion) {
      window.location.href = href;
      return;
    }
    veil.style.transition = 'opacity 0.3s ease-in';
    veil.style.opacity = '1';
    setTimeout(() => { window.location.href = href; }, 300);
  });
})();
