import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', (event) => {
  [...document.querySelectorAll('[data-gallery]')].forEach((gallery, idx) => {
    let swiperEl = gallery.querySelector('[data-gallery-swiper]');
    if (swiperEl && [...swiperEl.querySelectorAll('.swiper-slide')].length > 1) {
      new Swiper(swiperEl, {
        loop: true,
        speed: 1000,
        grabCursor: true,

        navigation: {
          nextEl: gallery.querySelector('[data-gallery-next]'),
        },
      });
    }
  });
});
