(function () {
  // Don't run on the home page — it has its own eclipse animation
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) return;

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

  // Entry: fade out over 0.5s
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      veil.style.transition = 'opacity 0.5s ease-out';
      veil.style.opacity = '0';
    });
  });

  // Exit: fade in over 0.3s, then navigate
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    e.preventDefault();
    veil.style.transition = 'opacity 0.3s ease-in';
    veil.style.opacity = '1';
    setTimeout(() => { window.location.href = href; }, 300);
  });
})();
