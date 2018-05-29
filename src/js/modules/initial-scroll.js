import SmoothScroll from 'smooth-scroll/dist/js/smooth-scroll.js';

window.addEventListener('load', (event) => {
  if (window.scrollY === 0) {
    let scroll = new SmoothScroll(null, {
      speed: 250,
      easing: 'easeOutQuad',
    });

    scroll.animateScroll(108); // magic number so the arrow is centered
  }
});
