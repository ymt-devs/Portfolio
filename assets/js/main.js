/**
* Template Name: Personal - Continuous Fluid Scroll Edition
* Updated for: Yojan Man Tuladhar Portfolio
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Smooth scroll with offset for fixed header
   */
  const scrollto = (el) => {
    let target = select(el);
    if (target) {
      let headerOffset = 72;
      let elementPosition = target.getBoundingClientRect().top;
      let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Smooth scroll on links with a hash (#)
   */
  on('click', '#navbar .nav-link, .scroll-to, .scroll-down-indicator, .hero-cta-group a, .footer-links a, .back-to-top', function(e) {
    if (this.hash && select(this.hash)) {
      e.preventDefault();

      let navbar = select('#navbar');
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }

      scrollto(this.hash);
    }
  }, true);

  /**
   * Bidirectional Scrollspy: automatically activates corresponding navbar tab
   * on scrolling both downwards AND upwards
   */
  const navLinks = select('#navbar .nav-link', true);
  const sections = select('section', true);

  const updateScrollSpy = () => {
    let scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      let top = section.offsetTop;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');

      if (id && scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Special case for very top of page (Hero)
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#hero') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

    // Special case for bottom of page (Contact)
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateScrollSpy);
  window.addEventListener('load', updateScrollSpy);

  /**
   * Real-time Scroll Progress Bar & Header Shadow
   */
  const progressBar = select('#scroll-progress');
  const header = select('#header');
  const backToTop = select('.back-to-top');

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    // Back to top button
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }

    // Top progress bar
    if (progressBar) {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }
  });

  /**
   * Reversible Bidirectional Scroll Reveal Animations
   * Animates smoothly in when entering viewport, and reverses when scrolled back
   */
  const setupScrollReveal = () => {
    const revealElements = select('.reveal-on-scroll', true);
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Reversible scroll: only remove if it's below viewport (scrolled back up)
            let rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.75) {
              entry.target.classList.remove('is-visible');
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => {
        revealObserver.observe(el);
        let rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-visible');
        }
      });
    } else {
      // Fallback
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  };

  window.addEventListener('load', setupScrollReveal);

  /**
   * Waypoint Skills progress bar animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    });
  }

  /**
   * Testimonials slider
   */
  window.addEventListener('load', () => {
    if (typeof Swiper !== 'undefined' && select('.testimonials-slider')) {
      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      });
    }
  });

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  if (typeof GLightbox !== 'undefined') {
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });

    const portfolioDetailsLightbox = GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  }

  /**
   * Portfolio details slider
   */
  window.addEventListener('load', () => {
    if (typeof Swiper !== 'undefined' && select('.portfolio-details-slider')) {
      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }
  });

})();