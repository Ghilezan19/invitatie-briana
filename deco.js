// Ghirlanda: stegulețele atârnă în arc, ca pe o sfoară
(function () {
    const b = document.querySelector('.bunting');
    if (b) {
        const n = Math.max(7, Math.min(16, Math.round(window.innerWidth / 48)));
        for (let i = 0; i < n; i++) {
            const s = document.createElement('span');
            const x = (i / (n - 1)) * 2 - 1;
            s.style.marginTop = (6 + 20 * (1 - x * x)) + 'px';
            b.appendChild(s);
        }
    }

    const f = document.querySelector('.floaters');
    if (f) {
        const emo = ['🍬', '🦇', '🍭', '🕸️', '⭐', '🍂', '🎃'];
        for (let i = 0; i < 12; i++) {
            const s = document.createElement('span');
            s.textContent = emo[i % emo.length];
            // doar pe margini, ca să nu acopere textul
            s.style.left = (i % 2 ? 88 + Math.random() * 7 : 1 + Math.random() * 7) + '%';
            s.style.top = (8 + Math.random() * 86) + '%';
            s.style.fontSize = (1 + Math.random() * 1.1) + 'rem';
            s.style.animationDuration = (5 + Math.random() * 5) + 's';
            s.style.animationDelay = (Math.random() * -8) + 's';
            f.appendChild(s);
        }
    }
})();
