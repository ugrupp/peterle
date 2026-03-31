import Swiper from "swiper";

document.addEventListener("DOMContentLoaded", () => {
  let slider = document.querySelector("[data-slider]");

  let unveilSlideImages = (swiper) => {
    swiper.slides.each((_, slide) => {
      if (
        !slide ||
        !window.lazySizes ||
        !window.lazySizes.loader ||
        !window.lazySizes.loader.unveil
      ) {
        return;
      }

      let images = slide.querySelectorAll(
        ".c-hero__img.lazyloading",
      );
      images.forEach((image) => {
        window.lazySizes.loader.unveil(image);
      });
    });
  };

  if (slider) {
    const swiperInstance = new Swiper(slider, {
      loop: true,
      speed: 1000,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: "[data-slider-next]",
      },

      pagination: {
        el: "[data-slider-pagination]",
        type: "fraction",
      },
    });

    swiperInstance.on("init", () => {
      unveilSlideImages(swiperInstance);
    });

    swiperInstance.on("slideChange", () => {
      unveilSlideImages(swiperInstance);
    });
  }
});
