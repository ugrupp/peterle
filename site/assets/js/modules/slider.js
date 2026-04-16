import Swiper from "swiper";

const SEASON_STORAGE_KEY = "peterle-season";

function getActiveSeason() {
  const stored = localStorage.getItem(SEASON_STORAGE_KEY);
  if (stored === "summer" || stored === "winter") {
    return stored;
  }
  const serverSeason = document.documentElement.dataset.serverSeason;
  return serverSeason === "winter" ? "winter" : "summer";
}

function applySeason(season) {
  document.documentElement.dataset.activeSeason = season;
}

function persistSeason(season) {
  localStorage.setItem(SEASON_STORAGE_KEY, season);
}

function unveilSeasonImages(season) {
  if (!window.lazySizes || !window.lazySizes.loader) {
    return;
  }
  document.querySelectorAll(`[data-season="${season}"].lazyload, [data-season="${season}"] .lazyload`).forEach((el) => {
    window.lazySizes.loader.unveil(el);
  });
  document.querySelectorAll(`[data-slider-season="${season}"] .lazyload`).forEach((el) => {
    window.lazySizes.loader.unveil(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Apply stored or server-default season immediately
  const initialSeason = getActiveSeason();
  applySeason(initialSeason);
  updateToggleButtons(initialSeason);

  const sliderEls = document.querySelectorAll("[data-slider]");
  const swipers = {};

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

  function updateToggleButtons(season) {
    document.querySelectorAll("[data-season-toggle]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.seasonToggle === season);
    });
  }

  function updatePagination(swiper) {
    const paginationEl = document.querySelector("[data-slider-pagination]");
    if (!paginationEl) return;
    const current = swiper.realIndex + 1;
    // Exclude cloned slides added by loop mode
    const total = Array.from(swiper.slides).filter((s) => !s.classList.contains("swiper-slide-duplicate")).length;
    paginationEl.textContent = `${current} / ${total}`;
  }

  sliderEls.forEach((sliderEl) => {
    const season = sliderEl.dataset.sliderSeason;
    const swiperInstance = new Swiper(sliderEl, {
      loop: true,
      speed: 1000,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });

    swiperInstance.on("init", () => {
      unveilSlideImages(swiperInstance);
    });

    swiperInstance.on("slideChange", () => {
      unveilSlideImages(swiperInstance);
      if (season === getActiveSeason()) {
        updatePagination(swiperInstance);
      }
    });

    if (season) {
      swipers[season] = swiperInstance;
    }
  });

  // Wire up the next button to the active slider
  const nextBtn = document.querySelector("[data-slider-next]");
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const activeSeason = getActiveSeason();
      const activeSwiper = swipers[activeSeason];
      if (activeSwiper) {
        activeSwiper.slideNext();
      }
    });
  }

  // Initialize pagination for the active slider
  const activeSwiper = swipers[initialSeason];
  if (activeSwiper) {
    updatePagination(activeSwiper);
  }

  // Wire up season toggle buttons
  document.querySelectorAll("[data-season-toggle]").forEach((btn) => {
    const season = btn.dataset.seasonToggle;
    btn.addEventListener("click", () => {
      const currentSeason = getActiveSeason();
      applySeason(season);
      persistSeason(season);
      updateToggleButtons(season);
      unveilSeasonImages(season);
      const swiper = swipers[season];
      if (swiper) {
        // Recalculate sizes in case this swiper was initialized while hidden
        swiper.update();
        if (season !== currentSeason) {
          swiper.slideToLoop(0, 0);
        }
        updatePagination(swiper);
      }
    });
  });
});
