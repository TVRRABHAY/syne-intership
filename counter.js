/* ============================================
   EYE 2 I — Counter Animation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';
  const duration = parseInt(element.dataset.duration, 10) || 2000;
  const useCommas = element.dataset.commas !== 'false';

  let startTime = null;
  const startValue = 0;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatNumber(num) {
    if (useCommas) {
      return num.toLocaleString('en-IN');
    }
    return num.toString();
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

    element.textContent = prefix + formatNumber(currentValue) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = prefix + formatNumber(target) + suffix;
      element.classList.add('counted');
    }
  }

  element.classList.add('counting');
  requestAnimationFrame(step);
}
