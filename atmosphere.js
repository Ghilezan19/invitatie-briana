// Fundalul animat: imagine, ceață, scântei și lilieci
(function () {
    const atmo = document.createElement('div');
    atmo.className = 'atmo';
    atmo.setAttribute('aria-hidden', 'true');
    atmo.innerHTML = '<div class="photo"></div><div class="glow"></div><div class="fog"></div><div class="fog f2"></div><div class="vignette"></div>';

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
        for (let i = 0; i < 22; i++) {
            const e = document.createElement('span');
            e.className = 'ember';
            e.style.left = Math.random() * 100 + '%';
            e.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
            e.style.animationDuration = (9 + Math.random() * 10) + 's';
            e.style.animationDelay = (Math.random() * -18) + 's';
            const size = 1.5 + Math.random() * 2.5;
            e.style.width = e.style.height = size + 'px';
            atmo.appendChild(e);
        }
        const batSvg = '<svg viewBox="0 0 64 28" fill="currentColor"><path d="M32 10c-2-4-4-5-4-5l1 4c-3-1-6 0-6 0 2-5-1-9-7-9 2 3 1 6-1 7-3-3-8-3-11 0 3 0 5 2 5 5-3-1-7 1-9 4 4-1 9 1 13 4 3-2 7-3 10-2 2 2 4 4 9 7 5-3 7-5 9-7 3-1 7 0 10 2 4-3 9-5 13-4-2-3-6-5-9-4 0-3 2-5 5-5-3-3-8-3-11 0-2-1-3-4-1-7-6 0-9 4-7 9 0 0-3-1-6 0l1-4s-2 1-4 5z"/></svg>';
        [[12, 0], [20, -6], [9, -10]].forEach(([top, delay], i) => {
            const b = document.createElement('div');
            b.className = 'bat';
            b.style.top = top + '%';
            b.style.animationDelay = (delay - i * 2) + 's';
            b.style.animationDuration = (14 + i * 4) + 's';
            b.innerHTML = batSvg;
            atmo.appendChild(b);
        });
    }
    document.body.prepend(atmo);
})();
