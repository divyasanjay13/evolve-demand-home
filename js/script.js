  // ─── Scroll Reveal ───
  const revealEls = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ─── Counter Animation ───
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = (suffix === 'x' ? Math.round(start) + 'x' :
                        suffix === '%' ? Math.round(start) + '%' :
                        '+' + Math.round(start).toLocaleString());
    }, 16);
  }

  // Trigger counters when stat section is visible
  const statNums = document.querySelectorAll('.stat-num');
  const statTargets = [70, 500, 1000];
  const counterDone = new Set();
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !counterDone.has(e.target)) {
        counterDone.add(e.target);
        const idx = [...statNums].indexOf(e.target);
        animateCounter(e.target, statTargets[idx]);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObs.observe(el));

  // Trigger result stat counters
  const resultStats = document.querySelectorAll('.result-stat');
  const resTargets = [{val:97,suf:'%'},{val:390,suf:'x'},{val:96,suf:'%'}];
  const resDone = new Set();
  const resObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !resDone.has(e.target)) {
        resDone.add(e.target);
        const idx = [...resultStats].indexOf(e.target);
        const numSpan = document.createElement('span');
        const arrow = e.target.querySelector('.arrow');
        e.target.innerHTML = '';
        e.target.appendChild(numSpan);
        if (arrow) e.target.appendChild(arrow);
        const {val, suf} = resTargets[idx];
        let s = 0;
        const sp = val / (1400/16);
        const t = setInterval(() => {
          s += sp;
          if (s >= val) { s = val; clearInterval(t); }
          numSpan.textContent = Math.round(s) + suf;
        }, 16);
      }
    });
  }, { threshold: 0.4 });
  resultStats.forEach(el => resObs.observe(el));

 

  // ─── Play button hover ───
  document.querySelector('.play-circle')?.addEventListener('click', () => {
    alert('Video coming soon!');
  });

    // ── Navbar scroll behaviour ──────────────────────
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });

    // ── Offcanvas ────────────────────────────────────
    const offcanvas = document.getElementById('offcanvasNav');
    const overlay   = document.getElementById('offcanvasOverlay');

    function openOffcanvas() {
      offcanvas.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeOffcanvas() {
      offcanvas.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeOffcanvas();
    });