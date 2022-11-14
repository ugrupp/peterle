import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
  let slider = document.querySelector('[data-slider]');
  if (slider) {
    new Swiper(slider, {
      loop: true,
      speed: 1000,
      grabCursor: true,

      navigation: {
        nextEl: '[data-slider-next]',
      },

      pagination: {
        el: '[data-slider-pagination]',
        type: 'fraction',
      },
    });
  }
});
