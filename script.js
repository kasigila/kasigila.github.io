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

  // ─── KarenOS Modules: Expand/Collapse ────────────────────────────────────
  const moduleBlocks = document.querySelectorAll('.module-block');

  moduleBlocks.forEach(function(block) {
    const header = block.querySelector('.module-header');
    const body = block.querySelector('.module-body');

    if (!header || !body) return;

    header.addEventListener('click', function() {
      const expanded = block.classList.contains('expanded');

      moduleBlocks.forEach(function(other) {
        if (other !== block) {
          other.classList.remove('expanded');
          var oBody = other.querySelector('.module-body');
          var oHeader = other.querySelector('.module-header');
          if (oBody) oBody.hidden = true;
          if (oHeader) oHeader.setAttribute('aria-expanded', 'false');
        }
      });

      if (expanded) {
        block.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
        body.hidden = true;
      } else {
        block.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
        body.hidden = false;
        if (block.dataset.module === 'revenue') updateRevenueEngine();
        if (block.dataset.module === 'risk') updateRiskEngine();
        if (block.dataset.module === 'arch') updateArchSimulator();
      }
    });
  });

  // ─── Revenue Intelligence Engine ───────────────────────────────────────
  function updateRevenueEngine() {
    const traffic = parseInt(document.getElementById('rev-traffic')?.value || 50, 10);
    const conv = parseFloat(document.getElementById('rev-conv')?.value || 3, 10) / 100;
    const uplift = parseInt(document.getElementById('rev-uplift')?.value || 12, 10) / 100;
    const duration = parseInt(document.getElementById('rev-duration')?.value || 14, 10);

    const trafficK = traffic * 1000;
    const arpu = 100;
    const dailyBaseline = trafficK * conv * arpu;
    const dailyLift = dailyBaseline * uplift;
    const revenueLift = dailyLift * duration;

    const n = Math.floor(trafficK * 0.5 * duration);
    const power = Math.sqrt(n) * uplift * 10;
    const significance = Math.min(99.9, Math.max(0, 50 + power));
    const riskFP = Math.max(0.1, Math.min(15, 100 - significance * 0.9));

    let decision = 'iterate';
    if (significance >= 95 && riskFP < 5 && uplift >= 0.05) decision = 'go';
    else if (significance < 80 || riskFP > 10) decision = 'kill';

    const ciLow = revenueLift * 0.7;
    const ciHigh = revenueLift * 1.3;

    const impactEl = document.getElementById('rev-impact');
    const ciBand = document.getElementById('rev-ci-band');
    const ciRange = document.getElementById('rev-ci-range');
    const sigEl = document.getElementById('rev-significance');
    const riskFill = document.getElementById('rev-risk-fill');
    const riskPct = document.getElementById('rev-risk-pct');
    const decisionEl = document.getElementById('rev-decision');
    const trafficVal = document.getElementById('rev-traffic-val');
    const upliftVal = document.getElementById('rev-uplift-val');

    if (impactEl) {
      var fmt = revenueLift >= 1e6 ? (revenueLift / 1e6).toFixed(1) + 'M' : revenueLift >= 1000 ? (revenueLift / 1000).toFixed(1) + 'K' : Math.round(revenueLift);
      impactEl.textContent = '$' + fmt;
    }
    if (ciBand) ciBand.style.background = 'linear-gradient(90deg, transparent ' + (30 + significance * 0.4) + '%, var(--accent-pink) 50%, transparent ' + (70 - significance * 0.4) + '%)';
    if (ciRange) ciRange.textContent = '$' + Math.round(ciLow) + ' – $' + Math.round(ciHigh);
    if (sigEl) sigEl.textContent = significance.toFixed(1) + '%';
    if (riskFill) riskFill.style.width = riskFP + '%';
    if (riskPct) riskPct.textContent = riskFP.toFixed(1) + '%';
    if (decisionEl) {
      decisionEl.textContent = decision.toUpperCase();
      decisionEl.className = 'decision-badge ' + decision;
    }
    if (trafficVal) trafficVal.textContent = traffic + 'K';
    if (upliftVal) upliftVal.textContent = document.getElementById('rev-uplift')?.value + '%';
  }

  ['rev-traffic', 'rev-conv', 'rev-uplift'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateRevenueEngine);
  });
  ['rev-duration', 'rev-segment'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateRevenueEngine);
  });

  // ─── Risk Intelligence Engine ────────────────────────────────────────────
  function updateRiskEngine() {
    const sens = parseInt(document.getElementById('risk-sensitivity')?.value || 70, 10) / 100;
    const tol = parseInt(document.getElementById('risk-tolerance')?.value || 30, 10) / 100;

    const riskProb = Math.round((0.3 + sens * 0.5 - tol * 0.2) * 100);
    const clampedProb = Math.max(5, Math.min(95, riskProb));
    const alertActive = clampedProb >= 60;
    const lossAvoided = Math.round(clampedProb * 1200 * sens);

    const precision = 0.5 + sens * 0.4;
    const recall = 0.6 + sens * 0.35 - tol * 0.2;

    const sensVal = document.getElementById('risk-sens-val');
    const tolVal = document.getElementById('risk-tol-val');
    const probEl = document.getElementById('risk-prob');
    const alertEl = document.getElementById('risk-alert');
    const lossEl = document.getElementById('risk-loss');
    const prPath = document.getElementById('pr-path');

    if (sensVal) sensVal.textContent = (sens * 100) + '%';
    if (tolVal) tolVal.textContent = (tol * 100) + '%';
    if (probEl) probEl.textContent = clampedProb + '%';
    if (alertEl) {
      alertEl.textContent = alertActive ? 'ACTIVE' : 'INACTIVE';
      alertEl.className = 'risk-alert ' + (alertActive ? 'active' : 'inactive');
    }
    if (lossEl) lossEl.textContent = '$' + (lossAvoided >= 1000 ? (lossAvoided / 1000).toFixed(1) + 'K' : lossAvoided);

    if (prPath) {
      const pts = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = 10 + t * 180;
        const y = 110 - (recall * 0.3 + precision * 0.5 * Math.sin(t * Math.PI)) * 80;
        pts.push(x + ',' + y);
      }
      prPath.setAttribute('d', 'M' + pts.join(' L'));
    }
  }

  ['risk-sensitivity', 'risk-tolerance'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateRiskEngine);
  });

  // ─── Architecture Simulator ──────────────────────────────────────────────
  const ARCH_CONFIG = {
    startup: {
      storage: 'Postgres',
      processing: 'Python ETL',
      modeling: 'Batch Retraining',
      deployment: 'Simple Cron',
      monitoring: 'Basic Logs',
      latency: '2–4 hrs',
      cost: '$500/mo',
      reliability: '92%',
      complexity: 'Low'
    },
    growth: {
      storage: 'Snowflake',
      processing: 'dbt + Airflow',
      modeling: 'ML Pipeline',
      deployment: 'CI/CD',
      monitoring: 'Metrics + Alerts',
      latency: '15–60 min',
      cost: '$8K/mo',
      reliability: '97%',
      complexity: 'Medium'
    },
    enterprise: {
      storage: 'Kafka + Data Lake',
      processing: 'Spark + Feature Store',
      modeling: 'Real-time Inference',
      deployment: 'K8s + Observability',
      monitoring: 'Full Observability',
      latency: '< 100ms',
      cost: '$45K/mo',
      reliability: '99.9%',
      complexity: 'High'
    }
  };

  function updateArchSimulator() {
    const active = document.querySelector('.scale-btn.active');
    const scale = active?.dataset.scale || 'startup';
    const config = ARCH_CONFIG[scale] || ARCH_CONFIG.startup;

    const layers = document.querySelectorAll('.arch-diagram .arch-layer');
    const layerKeys = ['storage', 'processing', 'modeling', 'deployment', 'monitoring'];
    layers.forEach(function(layer, i) {
      const key = layerKeys[i];
      if (key && config[key]) {
        layer.textContent = config[key];
        layer.classList.toggle('accent', key === 'monitoring');
      }
    });

    const latencyEl = document.getElementById('arch-latency');
    const costEl = document.getElementById('arch-cost');
    const relEl = document.getElementById('arch-reliability');
    const compEl = document.getElementById('arch-complexity');

    if (latencyEl) latencyEl.textContent = config.latency;
    if (costEl) costEl.textContent = config.cost;
    if (relEl) relEl.textContent = config.reliability;
    if (compEl) compEl.textContent = config.complexity;
  }

  document.querySelectorAll('.scale-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.scale-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      updateArchSimulator();
    });
  });

  document.querySelectorAll('#arch-diagram .arch-layer[data-tooltip]').forEach(function(layer) {
    layer.addEventListener('mouseenter', function(e) {
      if (archTooltip) {
        archTooltip.textContent = layer.getAttribute('data-tooltip');
        archTooltip.style.left = (e.clientX + 16) + 'px';
        archTooltip.style.top = (e.clientY + 16) + 'px';
        archTooltip.classList.add('visible');
      }
    });
    layer.addEventListener('mousemove', function(e) {
      if (archTooltip && archTooltip.classList.contains('visible')) {
        var w = archTooltip.offsetWidth || 280;
        var h = archTooltip.offsetHeight || 60;
        archTooltip.style.left = Math.min(e.clientX + 16, window.innerWidth - w - 16) + 'px';
        archTooltip.style.top = Math.min(e.clientY + 16, window.innerHeight - h - 16) + 'px';
      }
    });
    layer.addEventListener('mouseleave', function() {
      if (archTooltip) archTooltip.classList.remove('visible');
    });
  });
})();
