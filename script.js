/**
 * KarenOS v1.0 — Interactive Personal System
 * Pure vanilla JS. No dependencies.
 * Scroll progress · Recruiter mode · Typing · Count-up · Slider
 * Architecture tooltips · Skill expand · K-key neon · Cursor glow
 */

(function() {
  'use strict';

  // ─── Scroll Progress ─────────────────────────────────────────────────────
  const scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ─── Navbar ──────────────────────────────────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ─── Smooth Scroll ──────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navbar.classList.remove('mobile-open');
      }
    });
  });

  // ─── Recruiter Mode ──────────────────────────────────────────────────────
  const recruiterToggle = document.getElementById('recruiter-toggle');
  const heroRecruiterBtn = document.getElementById('hero-recruiter-btn');
  const recruiterSummary = document.getElementById('recruiter-summary');

  function setRecruiterMode(active) {
    document.body.classList.toggle('recruiter-mode', active);
    recruiterToggle.setAttribute('aria-pressed', active);
    recruiterSummary.setAttribute('aria-hidden', !active);
    recruiterSummary.style.display = active ? 'block' : 'none';
    try {
      active ? sessionStorage.setItem('recruiter-mode', '1') : sessionStorage.removeItem('recruiter-mode');
    } catch (_) {}
  }

  function toggleRecruiter() {
    setRecruiterMode(!document.body.classList.contains('recruiter-mode'));
  }

  recruiterToggle.addEventListener('click', toggleRecruiter);
  if (heroRecruiterBtn) heroRecruiterBtn.addEventListener('click', toggleRecruiter);

  try {
    if (sessionStorage.getItem('recruiter-mode') === '1') setRecruiterMode(true);
  } catch (_) {}

  // ─── Typing Effect ──────────────────────────────────────────────────────
  const typingLine = document.getElementById('typing-line');
  const typingText = 'Designing intelligent systems for measurable impact.';

  if (typingLine) {
    let i = 0;
    typingLine.textContent = '';
    function type() {
      if (i < typingText.length) {
        typingLine.textContent += typingText[i];
        i++;
        setTimeout(type, 45);
      } else {
        setTimeout(function() {
          typingLine.textContent = '';
          i = 0;
          setTimeout(type, 800);
        }, 2500);
      }
    }
    setTimeout(type, 800);
  }

  // ─── Count-Up Animation ─────────────────────────────────────────────────
  const metricValues = document.querySelectorAll('.metric-value[data-target]');
  const hasAnimated = new Set();

  function animateValue(el) {
    if (hasAnimated.has(el)) return;
    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else hasAnimated.add(el);
    }
    requestAnimationFrame(update);
  }

  function checkMetricsVisible() {
    metricValues.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) animateValue(el);
    });
  }

  window.addEventListener('scroll', checkMetricsVisible, { passive: true });
  window.addEventListener('load', checkMetricsVisible);

  // ─── Slider: Simulate Product Optimization ─────────────────────────────
  const convSlider = document.getElementById('conv-slider');
  const revenueSlider = document.getElementById('revenue-slider');
  const efficiencySlider = document.getElementById('efficiency-slider');
  const convValue = document.getElementById('conv-value');
  const revenueValue = document.getElementById('revenue-value');
  const efficiencyValue = document.getElementById('efficiency-value');

  function updateSliderDisplays() {
    if (convValue && convSlider) convValue.textContent = convSlider.value + '%';
    if (revenueValue && revenueSlider) {
      const v = parseFloat(revenueSlider.value);
      revenueValue.textContent = v >= 1 ? '$' + v.toFixed(1) + 'M' : '$' + (v * 1000).toFixed(0) + 'K';
    }
    if (efficiencyValue && efficiencySlider) efficiencyValue.textContent = efficiencySlider.value + '%';
  }

  [convSlider, revenueSlider, efficiencySlider].forEach(function(slider) {
    if (slider) slider.addEventListener('input', updateSliderDisplays);
  });
  updateSliderDisplays();

  // ─── Timeline Accordion ──────────────────────────────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item[data-expandable]');

  timelineItems.forEach(function(item) {
    const header = item.querySelector('.timeline-card-header');
    const body = item.querySelector('.timeline-card-body');

    if (!header || !body) return;

    header.addEventListener('click', function() {
      const expanded = item.classList.contains('expanded');

      timelineItems.forEach(function(other) {
        if (other !== item) {
          other.classList.remove('expanded');
          const oBody = other.querySelector('.timeline-card-body');
          const oHeader = other.querySelector('.timeline-card-header');
          if (oBody) oBody.hidden = true;
          if (oHeader) oHeader.setAttribute('aria-expanded', 'false');
        }
      });

      if (expanded) {
        item.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
        body.hidden = true;
      } else {
        item.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        body.hidden = false;
      }
    });
  });

  // ─── Architecture Tooltips ──────────────────────────────────────────────
  const archBlocks = document.querySelectorAll('.arch-block[data-tooltip]');
  const archTooltip = document.getElementById('arch-tooltip');

  if (archTooltip) {
    function positionTooltip(e) {
      const x = e.clientX + 16;
      const y = e.clientY + 16;
      const w = archTooltip.offsetWidth || 280;
      const h = archTooltip.offsetHeight || 60;
      archTooltip.style.left = Math.min(x, window.innerWidth - w - 16) + 'px';
      archTooltip.style.top = Math.min(y, window.innerHeight - h - 16) + 'px';
    }
    archBlocks.forEach(function(block) {
      block.addEventListener('mouseenter', function(e) {
        archTooltip.textContent = block.getAttribute('data-tooltip');
        positionTooltip(e);
        archTooltip.classList.add('visible');
      });
      block.addEventListener('mousemove', positionTooltip);
      block.addEventListener('mouseleave', function() {
        archTooltip.classList.remove('visible');
      });
    });
  }

  // ─── Skill Cards: Click to Expand ────────────────────────────────────────
  const skillCards = document.querySelectorAll('.skill-card[data-expandable]');

  skillCards.forEach(function(card) {
    card.addEventListener('click', function() {
      const expanded = card.classList.contains('expanded');
      const preview = card.querySelector('.skill-preview');
      const detail = card.querySelector('.skill-detail');

      if (expanded) {
        card.classList.remove('expanded');
        if (preview) { preview.hidden = false; }
        if (detail) { detail.hidden = true; detail.setAttribute('aria-hidden', 'true'); }
      } else {
        skillCards.forEach(function(c) {
          if (c !== card) {
            c.classList.remove('expanded');
            var p = c.querySelector('.skill-preview');
            var d = c.querySelector('.skill-detail');
            if (p) p.hidden = false;
            if (d) { d.hidden = true; d.setAttribute('aria-hidden', 'true'); }
          }
        });
        card.classList.add('expanded');
        if (preview) preview.hidden = true;
        if (detail) { detail.hidden = false; detail.setAttribute('aria-hidden', 'false'); }
      }
    });
  });

  // ─── Scroll Reveal ──────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .metric-card, .slider-panel, .timeline-item, .arch-block, .skill-card, .contact-subtitle, .contact-buttons, .hero-content, .hero-visual');

  function applyReveal() {
    revealEls.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  revealEls.forEach(function(el) {
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    if (!el.classList.contains('visible') && !el.classList.contains('metric-card') && !el.classList.contains('slider-panel')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
    }
  });

  window.addEventListener('scroll', applyReveal, { passive: true });
  window.addEventListener('load', applyReveal);

  // ─── Cursor Glow ────────────────────────────────────────────────────────
  const cursorGlow = document.getElementById('cursor-glow');
  let mx = 0, my = 0, gx = 0, gy = 0;

  if (cursorGlow && !('ontouchstart' in window)) {
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX;
      my = e.clientY;
    });
    function tick() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      cursorGlow.style.left = (gx - 200) + 'px';
      cursorGlow.style.top = (gy - 200) + 'px';
      cursorGlow.style.opacity = '0.35';
      requestAnimationFrame(tick);
    }
    tick();
  }

  // ─── K Key: Neon Mode ───────────────────────────────────────────────────
  document.addEventListener('keydown', function(e) {
    if (e.key === 'k' || e.key === 'K') {
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        document.body.classList.toggle('neon-mode');
      }
    }
  });

  // ─── Mobile Nav ─────────────────────────────────────────────────────────
  const mobileToggle = document.querySelector('.nav-mobile-toggle');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navbar.classList.toggle('mobile-open');
      const open = navbar.classList.contains('mobile-open');
      mobileToggle.setAttribute('aria-expanded', open);
      mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
})();
