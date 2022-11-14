import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', () => {
  let teaserFaders = [...document.querySelectorAll('[data-teaser-fader]')];
  if (teaserFaders.length) {
    let delay = 6000;
    let swipers = teaserFaders.map((teaserFader, idx) => {
      return new Swiper(teaserFader, {
        loop: true,
        speed: 1000,
        effect: 'fade',
        autoplay: idx > 0 ? false : {
          delay: delay,
          waitForTransition: false,
        },

        simulateTouch: false,
        allowSwipeToNext: false,
        allowSwipeToPrev: false,
        keyboard: false,
      });
    });

    // sync sliders
    swipers[0] && swipers[0].on('slideChange', () => {
      swipers.slice(1).forEach((swiper, idx) => {
        setTimeout(() => {
          swiper.slideNext();
        }, delay / swipers.length * ++idx);
      });
    });
  }
});
