import Colcade from 'colcade';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', (event) => {
  let masonry = document.querySelector('[data-masonry-grid]');
  if (masonry) {
    let colc = new Colcade(masonry, {
      columns: '[data-masonry-col]',
      items: '[data-masonry-item]',
    });

    window.addEventListener('resize', throttle(colc.layout.bind(colc)), false);
    window.addEventListener('load', colc.layout.bind(colc), false);
  }
});
