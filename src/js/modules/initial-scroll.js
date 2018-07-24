import SmoothScroll from 'smooth-scroll/dist/js/smooth-scroll.js';

window.addEventListener('load', (event) => {
  if (window.scrollY === 0 && [...document.querySelectorAll('[data-hero]')].length) {
    let scroll = new SmoothScroll(null, {
      speed: 500,
      easing: 'easeOutQuad',
    });

    scroll.animateScroll(108); // magic number so the arrow is centered
  }
});
