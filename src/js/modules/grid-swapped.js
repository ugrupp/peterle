export default class GridSwapped {
  constructor() {
    this.swapped = false;

    document.addEventListener('DOMContentLoaded', (event) => {
      // only supports 1 grid atm
      this.grid = document.querySelector('[data-grid-swapped]');
      if (this.grid) {
        this.swapItems = [...this.grid.querySelectorAll('[data-grid-swapped-item]')];
        if (this.swapItems.length) {
          // DOM els are here => let's go
          let mql = window.matchMedia('(min-width: 48em)');
          mql.addListener(this.screenTest.bind(this));
          this.screenTest(mql);
        }
      }
    });
  }

  screenTest(mql) {
    this.swapGrid(mql.matches);
  }

  swapGrid(newSwappedState) {
    if (newSwappedState !== this.swapped) {
      // perform the swap
      this.swapItems.forEach((swapItem, idx) => {
        if (idx % 2) {
          // update DOM
          swapItem.parentNode.insertBefore(swapItem, this.swapItems[idx - 1]);
        }
      });

      // update swapItems order after DOM manipulation is complete
      this.swapItems = [...this.grid.querySelectorAll('[data-grid-swapped-item]')];

      // set new state
      this.swapped = newSwappedState;
    }
  }
}
