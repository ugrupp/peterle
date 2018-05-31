export default class Archive {
  constructor() {
    document.addEventListener('DOMContentLoaded', (event) => {
      this.el = document.querySelector('[data-archive]');

      // init success depends on root element being found
      if (this.el) {
        this.openers = [...this.el.querySelectorAll('[data-archive-year-opener]')];
        this.lists = [...this.el.querySelectorAll('[data-archive-year-list]')];

        if (this.openers.length && this.lists.length) {
          this.initOpeners();
          this.open(this.lists[0].id);
        }
      }
    });
  }

  initOpeners() {
    this.openers.forEach((opener, idx) => {
      opener.addEventListener('click', (e) => {
        this.open(e.currentTarget.getAttribute('href').replace('#', ''));

        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
    });
  }

  // Opens a list by a given ID
  open(id) {
    let list = this.lists.find((el) => el.id === id);
    if (list) {
      // first, close all opened lists
      this.closeAll();

      // open list
      list.classList.add('is-open');

      // tell opener
      let opener = this.openers.find((el) => el.getAttribute('href') === `#${id}`);
      if (opener) {
        opener.classList.add('is-open');
      }
    }
  }

  // Closes all lists
  closeAll() {
    [...this.lists, ...this.openers].forEach((item) => {
      item.classList.remove('is-open');
    })
  }
}
