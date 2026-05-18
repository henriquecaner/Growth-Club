// Split view: clone the card into dark + light panes.
// Runs on DOMContentLoaded; wraps the existing content.
(function () {
  function apply() {
    // Skip if the page opts out
    if (document.documentElement.hasAttribute('data-no-split')) return;
    // Skip if already split
    if (document.querySelector('.split-root')) return;

    const body = document.body;
    // Capture original children (not scripts)
    const original = [...body.childNodes];

    const root = document.createElement('div');
    root.className = 'split-root';

    const paneLight = document.createElement('div');
    paneLight.className = 'split-pane';
    paneLight.setAttribute('data-theme', 'light');
    paneLight.setAttribute('data-label', 'LIGHT');

    const paneDark = document.createElement('div');
    paneDark.className = 'split-pane';
    paneDark.setAttribute('data-theme', 'dark');
    paneDark.setAttribute('data-label', 'DARK · SECTION');

    // Move original children into a fragment to clone
    const frag = document.createDocumentFragment();
    original.forEach(n => {
      if (n.nodeType === 1 && n.tagName === 'SCRIPT') return;
      frag.appendChild(n);
    });

    // Clone the fragment for each pane
    const lightClone = frag.cloneNode(true);
    const darkClone = frag.cloneNode(true);

    paneLight.appendChild(lightClone);
    paneDark.appendChild(darkClone);

    // Light first (left), dark second (right)
    root.appendChild(paneLight);
    root.appendChild(paneDark);
    body.appendChild(root);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
