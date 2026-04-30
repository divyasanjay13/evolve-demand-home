document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // Scroll Reveal
  // ─────────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ─────────────────────────────────────────────
  // Counter Animation
  // ─────────────────────────────────────────────
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        start = target;
        clearInterval(timer);
      }

      if (suffix === 'x') {
        el.textContent = Math.round(start) + 'x';
      } else if (suffix === '%') {
        el.textContent = Math.round(start) + '%';
      } else {
        el.textContent = '+' + Math.round(start).toLocaleString();
      }

    }, 16);
  }


  // ─────────────────────────────────────────────
  // Stats Counter
  // ─────────────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');
  const statTargets = [70, 500, 1000];
  const statTriggered = new Set();

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statTriggered.has(entry.target)) {
        statTriggered.add(entry.target);
        const index = [...statNums].indexOf(entry.target);
        animateCounter(entry.target, statTargets[index]);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));


  // ─────────────────────────────────────────────
  // Result Stats Counter
  // ─────────────────────────────────────────────
  const resultStats = document.querySelectorAll('.result-stat');
  const resultTargets = [
    { val: 97, suf: '%' },
    { val: 390, suf: 'x' },
    { val: 96, suf: '%' }
  ];

  const resultTriggered = new Set();

  const resultObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !resultTriggered.has(entry.target)) {

        resultTriggered.add(entry.target);

        const index = [...resultStats].indexOf(entry.target);
        const { val, suf } = resultTargets[index];

        const numberSpan = document.createElement('span');
        const arrow = entry.target.querySelector('.arrow');

        entry.target.innerHTML = '';
        entry.target.appendChild(numberSpan);
        if (arrow) entry.target.appendChild(arrow);

        let current = 0;
        const step = val / (1400 / 16);

        const timer = setInterval(() => {
          current += step;

          if (current >= val) {
            current = val;
            clearInterval(timer);
          }

          numberSpan.textContent = Math.round(current) + suf;
        }, 16);
      }
    });
  }, { threshold: 0.4 });

  resultStats.forEach(el => resultObserver.observe(el));


  // ─────────────────────────────────────────────
  // Navbar Scroll Effect
  // ─────────────────────────────────────────────
  const nav = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }
  }, { passive: true });


  // ─────────────────────────────────────────────
  // Offcanvas Menu
  // ─────────────────────────────────────────────
  const offcanvas = document.getElementById('offcanvasNav');
  const overlay = document.getElementById('offcanvasOverlay');

  window.openOffcanvas = function () {
    offcanvas?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeOffcanvas = function () {
    offcanvas?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeOffcanvas();
    }
  });


  // ─────────────────────────────────────────────
  // Play Button
  // ─────────────────────────────────────────────
  document.querySelector('.play-circle')?.addEventListener('click', () => {
    alert('Video coming soon!');
  });


  // ─────────────────────────────────────────────
  // Diff Section Stagger Animation
  // ─────────────────────────────────────────────
  const diffSection = document.querySelector('.different-section');
  const diffItems = document.querySelectorAll('.diff-item');

  if (diffSection) {
    const diffObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          diffItems.forEach(item => {
            const delay = parseInt(item.dataset.itemDelay || 0);
            setTimeout(() => {
              item.classList.add('item-visible');
            }, delay);
          });
          diffObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });

    diffObserver.observe(diffSection);
  }

});
