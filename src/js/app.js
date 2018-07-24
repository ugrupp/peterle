//
// JS entry file
// --------------------------------------------------

// SVG <use> polyfill
import 'svgxuse';

// Babel polyfill
// This import will transpile to single core-js module imports. Only the polyfills needed for our target browsers will be imported.
// Powered by `useBuiltIns: usage` in .babelrc
import 'babel-polyfill'; // eslint-disable-line import/no-unresolved

// module imports
import './modules/object-fit-images';
import './modules/topbar';
import './modules/initial-scroll';
import './modules/slider';
import './modules/reveal-animations';
import './modules/scroll-to';
import './modules/gmap';
import './modules/teaser-fader';

import Menu from './modules/menu';
import Archive from './modules/archive';
import Masonry from './modules/masonry';
import GridSwapped from './modules/grid-swapped';

// init modules
new Menu();
new Archive();
new Masonry();
new GridSwapped();
