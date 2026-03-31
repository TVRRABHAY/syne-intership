/* ============================================
   EYE 2 I — Scroll Animations (Intersection Observer + GSAP)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initParallax();
  initGSAPAnimations();
});

/* --- Intersection Observer for Scroll Reveals --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --- Parallax Background Effect --- */
function initParallax() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (!parallaxLayers.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed = layer.dataset.speed || 0.3;
      layer.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

/* --- GSAP Scroll Animations (if GSAP is available) --- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Animate section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Animate cards with stagger
  gsap.utils.toArray('.features-grid, .age-cards-grid, .business-grid, .analysts-grid').forEach(grid => {
    const cards = grid.children;
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  // Stats number scale
  gsap.utils.toArray('.stat-number').forEach(num => {
    gsap.from(num, {
      scrollTrigger: {
        trigger: num,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
  });

  // Pricing cards
  gsap.utils.toArray('.pricing-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'power3.out'
    });
  });

  // Hero content reveal
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    gsap.from(heroVisual, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.5
    });
  }
}
