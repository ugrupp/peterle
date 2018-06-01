import Colcade from 'colcade';
import throttle from 'lodash.throttle';

export default class Masonry {
  constructor() {
    this.mode = null; // 'onecol' or 'multicol'

    document.addEventListener('DOMContentLoaded', (event) => {
      this.el = document.querySelector('[data-masonry-grid]');

      // init success depends on root element being found
      if (this.el) {
        // create colcade
        this.colc = new Colcade(this.el, {
          columns: '[data-masonry-col]',
          items: '[data-masonry-item]',
        });

        // setup handlers
        window.addEventListener('resize', throttle(this.update.bind(this)));
        window.addEventListener('load', this.update.bind(this));
      }
    });
  }

  update() {
    if (window.matchMedia("(min-width: 48em)").matches) {
      this.multicol();
    } else {
      this.onecol();
    }
  }

  onecol() {
    if (this.mode !== 'onecol') {
      this.mode = 'onecol';
      this.colc.destroy();
    }
  }

  multicol() {
    this.colc.layout();
  }
}
