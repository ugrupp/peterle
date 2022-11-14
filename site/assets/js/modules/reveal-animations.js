// Reveal animations
// scrollreaveal should be a window variable, set in the <head> script

if (typeof window.sr !== 'undefined') {
  window.sr.reveal('[data-reveal]', {
    duration: 750,
    distance: '3em',
    scale: 1,
    interval: 100,
    viewFactor: 0.1,
  });
}
