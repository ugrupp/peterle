// OFI polyfill
import objectFitImages from 'object-fit-images';

document.addEventListener('DOMContentLoaded', () => {
  objectFitImages('img:not(.lazyload):not(.lazyloaded):not(.lazyloading)');
});
