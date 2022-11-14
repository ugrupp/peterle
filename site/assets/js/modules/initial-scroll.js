import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.js';

window.addEventListener('load', () => {
  if (window.scrollY === 0 && [...document.querySelectorAll('[data-hero]')].length) {
    let scroll = new SmoothScroll("[data-scroll-content]", {
      speed: 500,
      easing: 'easeOutQuad',
    });

    scroll.animateScroll(108); // magic number so the arrow is centered
  }
});
