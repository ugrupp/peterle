import SmoothScroll from 'smooth-scroll/dist/js/smooth-scroll.js';

document.addEventListener('DOMContentLoaded', (event) => {
  new SmoothScroll('[data-scroll-top]', {
    speed: 750,
    easing: 'easeOutQuad',
  });
});
