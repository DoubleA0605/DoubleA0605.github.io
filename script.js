/**
 * Main JavaScript file for Andy Wong's Portfolio
 * Handles mobile menu, scroll spy, and certifications filter.
 * Language switching is handled via separate directories (/en/, /hk/, /cn/).
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio successfully loaded.');
    
    // Prevent horizontal overscroll on mobile devices
    // Method 1: Block horizontal touch gestures
    let touchStartX = 0;
    let touchStartY = 0; 
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchStartY = e.touches[0].pageY; 
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        const deltaX = Math.abs(e.touches[0].pageX - touchStartX);
        const deltaY = Math.abs(e.touches[0].pageY - touchStartY); 
        // If primarily horizontal swipe, prevent it
        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    // Method 2: Force reset any horizontal scroll that somehow occurs
    let resettingScroll = false;
    window.addEventListener('scroll', () => {
        if (window.scrollX !== 0 && !resettingScroll) {
            resettingScroll = true;
            requestAnimationFrame(() => {
                window.scrollTo(0, window.scrollY);
                resettingScroll = false;
            });
        }
    }, { passive: false });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));

    // Scroll spy - highlight active section link
    const sections = document.querySelectorAll('section[id]');
    function onScroll() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Certification search and filter functionality
    const certSearch = document.getElementById('certSearch');
    if (certSearch) {
        // Debounced search for better performance
        let debounceTimer;
        const debouncedFilter = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterCertifications, 150);
        };
        
        certSearch.addEventListener('keyup', debouncedFilter);
        certSearch.addEventListener('input', debouncedFilter);
        // Allow clearing with Escape key
        certSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                certSearch.value = '';
                filterCertifications();
            }
        });

        // Initialize count on page load
        filterCertifications();
    }

    function filterCertifications() {
        const searchInput = document.getElementById('certSearch');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const certCards = document.querySelectorAll('.cert-card');
        let visibleCount = 0;

        certCards.forEach(card => {
            const certData = card.getAttribute('data-cert');
            if (!certData) {
                card.classList.remove('hidden');
                visibleCount++;
                return;
            }
            
            const cardTitleEl = card.querySelector('h3');
            const cardIssuerEl = card.querySelector('p');
            const cardTitle = cardTitleEl ? cardTitleEl.textContent.toLowerCase() : '';
            const cardIssuer = cardIssuerEl ? cardIssuerEl.textContent.toLowerCase() : '';
            const cardSkills = card.querySelectorAll('.skill-tag');
            let skillsText = '';
            cardSkills.forEach(skill => {
                skillsText += skill.textContent.toLowerCase() + ' ';
            });

            // Search in title, issuer, skills, and data-cert attribute
            const searchableText = cardTitle + ' ' + cardIssuer + ' ' + skillsText + ' ' + certData.toLowerCase();
            
            if (searchTerm === '' || searchableText.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update cert count with aria-live for accessibility
        const certCount = document.getElementById('certCount');
        if (certCount) {
            certCount.textContent = visibleCount;
            // Update aria-live region for screen readers
            const certFilterInfo = document.querySelector('.cert-filter-info');
            if (certFilterInfo && searchTerm !== '') {
                certFilterInfo.setAttribute('aria-live', 'polite');
            }
        }
    }
});
/* =============================================================
   Visual enhancements — Gradisen SMART refresh
   Scroll progress, glass effects, reveal animations, spotlight,
   constellation backdrop and back-to-top. All progressive: if
   anything is unsupported the page keeps working as before.
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(function () {
    buildEffectLayer();
    buildScrollProgress();
    buildBackToTop();
    initNavbarState();
    initReveal();
    initSpotlight();
    initHeroTilt();
    initCursorGlow();
    initMarquee();
    initBannerTilt();
    initMagnetic();
  });

  /* ---------- Backdrop: grid + constellation ---------- */
  function buildEffectLayer() {
    if (!document.body || document.querySelector('.bg-fx')) return;

    var fx = document.createElement('div');
    fx.className = 'bg-fx';
    fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML =
      '<canvas class="fx-canvas"></canvas>' +
      '<div class="fx-grid"></div>' +
      '<div class="fx-glow"></div>';

    document.body.insertBefore(fx, document.body.firstChild);

    if (!reduceMotion) {
      startConstellation(fx.querySelector('.fx-canvas'));
    }
  }

  function startConstellation(canvas) {
    if (!canvas || typeof canvas.getContext !== 'function') return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width = 0;
    var height = 0;
    var dots = [];
    var frame = null;
    var last = 0;
    var FRAME_MS = 1000 / 30;

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.round((width * height) / 34000);
      count = Math.max(16, Math.min(54, count));

      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.random() * 1.5 + 0.6
        });
      }
    }

    function draw(now) {
      frame = requestAnimationFrame(draw);
      if (document.hidden) return;
      if (now - last < FRAME_MS) return;
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -24) d.x = width + 24;
        if (d.x > width + 24) d.x = -24;
        if (d.y < -24) d.y = height + 24;
        if (d.y > height + 24) d.y = -24;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(125, 211, 252, 0.5)';
        ctx.fill();
      }

      var maxDist = 132;
      var maxDist2 = maxDist * maxDist;
      for (i = 0; i < dots.length; i++) {
        for (var j = i + 1; j < dots.length; j++) {
          var a = dots[i];
          var b = dots[j];
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          var dist2 = dx * dx + dy * dy;
          if (dist2 < maxDist2) {
            ctx.strokeStyle = 'rgba(99, 179, 237, ' + (0.18 * (1 - dist2 / maxDist2)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    size();
    window.addEventListener('resize', function () {
      window.clearTimeout(canvas._resizeTimer);
      canvas._resizeTimer = window.setTimeout(size, 180);
    }, { passive: true });

    frame = requestAnimationFrame(draw);
    window.addEventListener('pagehide', function () {
      if (frame) cancelAnimationFrame(frame);
    }, { once: true });
  }

  /* ---------- Scroll progress bar ---------- */
  function buildScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---------- Navbar scroll state ---------- */
  function initNavbarState() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var ticking = false;
    function update() {
      ticking = false;
      navbar.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) return;

    var selector = [
      '.hero-content > *',
      '.hero-aside > *',
      'section > h2',
      'section > .card',
      '.contact-icons',
      'footer .container',
      'nav[aria-label="Breadcrumb"]',
      '.tech-marquee'
    ].join(', ');

    var targets = document.querySelectorAll(selector);
    if (!targets.length) return;

    if (reduceMotion) {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add('reveal');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) revealNow(entry.target, observer);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    function revealNow(el, obs) {
      if (el.classList.contains('in-view')) return;
      el.classList.remove('is-pending');
      el.classList.add('in-view');
      if (obs) obs.unobserve(el);
    }

    var pending = [];
    var viewportH = window.innerHeight || 800;

    Array.prototype.forEach.call(targets, function (el, index) {
      el.classList.add('reveal');
      el.style.animationDelay = (Math.min(index, 5) * 55) + 'ms';

      var rect = el.getBoundingClientRect();
      if (rect.top > viewportH * 0.94) {
        el.classList.add('is-pending');
        pending.push(el);
        observer.observe(el);
      } else {
        revealNow(el);
      }
    });

    // Safety net: the observer can miss layout shifts, so sweep on scroll too.
    var ticking = false;
    function sweep() {
      ticking = false;
      for (var i = pending.length - 1; i >= 0; i--) {
        var el = pending[i];
        if (el.classList.contains('in-view')) { pending.splice(i, 1); continue; }
        if (el.getBoundingClientRect().top < (window.innerHeight || 800) * 0.96) {
          revealNow(el, observer);
          pending.splice(i, 1);
        }
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(sweep); }
    }, { passive: true });

    window.addEventListener('resize', sweep, { passive: true });
    window.setTimeout(sweep, 900);
  }

  /* ---------- Cursor spotlight on cards ---------- */
  function initSpotlight() {
    if (!finePointer) return;

    var cards = document.querySelectorAll('.card');
    Array.prototype.forEach.call(cards, function (card) {
      var pending = null;

      card.addEventListener('pointermove', function (event) {
        if (pending) return;
        pending = requestAnimationFrame(function () {
          pending = null;
          var rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
          card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
        });
      }, { passive: true });
    });
  }

  /* ---------- Subtle 3D tilt on the hero portrait ---------- */
  function initHeroTilt() {
    if (!finePointer || reduceMotion) return;

    var avatar = document.querySelector('.hero-aside .hero-avatar');
    if (!avatar) return;

    var zone = avatar.parentElement || avatar;

    zone.addEventListener('pointermove', function (event) {
      var rect = avatar.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width - 0.5;
      var py = (event.clientY - rect.top) / rect.height - 0.5;
      avatar.style.transform =
        'perspective(900px) rotateX(' + (-py * 7).toFixed(2) + 'deg) rotateY(' +
        (px * 7).toFixed(2) + 'deg)';
    }, { passive: true });

    zone.addEventListener('pointerleave', function () {
      avatar.style.transform = '';
    });
  }

  /* ---------- Ambient cursor glow ---------- */
  function initCursorGlow() {
    if (!finePointer) return;

    var glow = document.querySelector('.fx-glow');
    if (!glow) return;

    document.body.classList.add('has-pointer');

    var pending = false;
    var x = 0;
    var y = 0;

    document.addEventListener('pointermove', function (event) {
      x = event.clientX;
      y = event.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        glow.style.transform = 'translate(' + x + 'px, ' + y + 'px) translate(-50%, -50%)';
      });
    }, { passive: true });
  }

  /* ---------- Infinite tech marquee ---------- */
  function initMarquee() {
    var track = document.querySelector('.tech-marquee__track');
    if (!track) return;

    var content = track.innerHTML.trim();
    if (!content) return;

    // Duplicate the strip once so the -50% translate loops seamlessly.
    track.innerHTML = content + content;

    if (reduceMotion) {
      track.style.animation = 'none';
      track.style.transform = 'none';
    }
  }

  /* ---------- Tilt on project banners ---------- */
  function initBannerTilt() {
    if (!finePointer || reduceMotion) return;

    var banners = document.querySelectorAll('.project-image:not(.project-image--smart)');
    Array.prototype.forEach.call(banners, function (banner) {
      var pending = null;

      banner.addEventListener('pointermove', function (event) {
        if (pending) return;
        pending = requestAnimationFrame(function () {
          pending = null;
          var rect = banner.getBoundingClientRect();
          var px = (event.clientX - rect.left) / rect.width - 0.5;
          var py = (event.clientY - rect.top) / rect.height - 0.5;
          banner.style.transform =
            'perspective(1100px) rotateX(' + (-py * 4).toFixed(2) + 'deg) rotateY(' +
            (px * 5).toFixed(2) + 'deg)';
        });
      }, { passive: true });

      banner.addEventListener('pointerleave', function () {
        banner.style.transform = '';
      });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;

    var nodes = document.querySelectorAll('.hero-cta .btn, .btn-gradisen');
    Array.prototype.forEach.call(nodes, function (el) {
      var pending = null;

      el.addEventListener('pointermove', function (event) {
        if (pending) return;
        pending = requestAnimationFrame(function () {
          pending = null;
          var rect = el.getBoundingClientRect();
          var dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
          var dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
          var x = Math.max(-6, Math.min(6, dx * 12));
          var y = Math.max(-6, Math.min(6, dy * 12));
          el.style.transform =
            'translate(' + x.toFixed(2) + 'px, ' + (y - 3).toFixed(2) + 'px) scale(1.02)';
        });
      }, { passive: true });

      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Back to top ---------- */
  function buildBackToTop() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML =
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(button);

    var ticking = false;
    function toggle() {
      ticking = false;
      button.classList.toggle('show', window.scrollY > 520);

      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      button.style.setProperty('--p', ratio.toFixed(3));
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(toggle);
      }
    }, { passive: true });

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    toggle();
  }
})();
