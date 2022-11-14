import SmoothScroll from 'smooth-scroll';

document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll('[data-scroll-top]', {
    speed: 750,
    easing: 'easeOutQuad',
  });

  new SmoothScroll('[data-scroll-content]', {
    speed: 500,
    easing: 'easeOutQuad',
  });
});
