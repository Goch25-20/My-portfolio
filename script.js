/* ========================================
   GOCH THIONG GARANG AKOT — PORTFOLIO JS
======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // NAVBAR — scroll effect
  // ==============================
  const navbar = document.getElementById('navbar');

  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load


  // ==============================
  // HAMBURGER — mobile menu toggle
  // ==============================
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });


  // ==============================
  // ACTIVE NAV LINK — on scroll
  // ==============================
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // ==============================
  // SCROLL REVEAL — fade-up on scroll
  // ==============================
  const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowH = window.innerHeight;

    reveals.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < windowH - 80) {
        el.classList.add('visible');
      }
    });
  };

  // Add reveal classes to elements
  const addRevealClasses = () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('reveal');
    });

    // About grid children
    document.querySelectorAll('.about-image-wrap, .about-text').forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-2');
    });

    // Stat blocks
    document.querySelectorAll('.stat').forEach((el, i) => {
      el.classList.add('reveal', `reveal-delay-${i + 1}`);
    });

    // Skill cards
    document.querySelectorAll('.skill-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 2) * 0.15}s`;
    });

    // Contact grid children
    document.querySelectorAll('.contact-info, .contact-form').forEach((el, i) => {
      el.classList.add('reveal');
      if (i === 1) el.classList.add('reveal-delay-2');
    });
  };

  addRevealClasses();

  window.addEventListener('scroll', revealElements, { passive: true });
  revealElements(); // run once


  // ==============================
  // SKILL BARS — animate on scroll
  // ==============================
  const animateSkillBars = () => {
    const bars = document.querySelectorAll('.skill-fill');

    bars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && bar.style.width === '0%' || bar.style.width === '') {
        const targetWidth = bar.getAttribute('data-width') + '%';
        // slight delay to make it feel natural
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
      }
    });
  };

  window.addEventListener('scroll', animateSkillBars, { passive: true });
  animateSkillBars();


  // ==============================
  // COUNTER ANIMATION — About stats
  // ==============================
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && !counter.dataset.animated) {
        counter.dataset.animated = 'true';

        const rawText  = counter.textContent.trim();
        const suffix   = rawText.replace(/[\d]/g, ''); // e.g. '+', 'k'
        const target   = parseInt(rawText.replace(/\D/g, ''), 10);
        const duration = 1800;
        const stepTime = 20;
        const steps    = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + suffix;
        }, stepTime);
      }
    });
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();


  // ==============================
  // SMOOTH SCROLL — anchor links
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH   = navbar.offsetHeight;
        const top    = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ==============================
  // CONTACT FORM — submit handler
  // ==============================
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn      = form.querySelector('button[type="submit"]');
      const btnSpan  = btn.querySelector('span');
      const btnIcon  = btn.querySelector('i');

      // Loading state
      btn.disabled    = true;
      btnSpan.textContent = 'Sending…';
      btnIcon.className   = 'fas fa-spinner fa-spin';

      // Simulate sending (replace with real API call)
      setTimeout(() => {
        btn.disabled    = false;
        btnSpan.textContent = 'Send Message';
        btnIcon.className   = 'fas fa-paper-plane';

        form.reset();
        successMsg.classList.add('show');

        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 5000);
      }, 1600);
    });
  }


  // ==============================
  // NAVBAR LOGO — scroll to top
  // ==============================
  document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ==============================
  // KEYBOARD NAV — close menu on Escape
  // ==============================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

});
