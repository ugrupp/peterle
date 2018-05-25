import Headroom from 'headroom.js';

document.addEventListener('DOMContentLoaded', (event) => {
  let topbar = document.querySelector('[data-topbar]');
  if (topbar) {
    // Scroll behavior
    let headroom = new Headroom(topbar, {
      // vertical offset in px before element is first unpinned
      offset: topbar.offsetHeight,
      // scroll tolerance in px before state changes
      tolerance: 5,
      classes: {
        // when element is initialised
        initial: 'c-topbar--headroom-initialized',
        // when scrolling up
        pinned: 'c-topbar--pinned',
        // when scrolling down
        unpinned: 'c-topbar--unpinned',
        // when above offset
        top: 'c-topbar--top',
        // when below offset
        notTop: 'c-topbar--not-top',
        // when at bottom of scoll area
        bottom: 'c-topbar--bottom',
        // when not at bottom of scroll area
        notBottom: 'c-topbar--not-bottom',
      },
    });

    headroom.init();
  }
});
