//
// JS entry file
// --------------------------------------------------

// import svgs to build sprite
const svgs = import.meta.globEager('../svg/*.svg')
svgs;

// module imports
import './modules/topbar';
import './modules/initial-scroll';
import './modules/slider';
import './modules/reveal-animations';
import './modules/scroll-to';
import './modules/gmap';
import './modules/teaser-fader';
import './modules/gallery';

import Menu from './modules/menu';
import Masonry from './modules/masonry';
import GridSwapped from './modules/grid-swapped';

// init modules
new Menu();
new Masonry();
new GridSwapped();
