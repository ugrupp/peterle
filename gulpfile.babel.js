/* ========================================================================
 * gulpfile
 * ======================================================================== */

import gulp from "gulp";
import {spawn} from "child_process";
import hugoBin from "hugo-bin";
import gulpLoadPlugins from 'gulp-load-plugins'
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfigProd from "./webpack.conf.prod";
import webpackConfigDev from "./webpack.conf.dev";
import dotenv from 'dotenv';
import moduleImporter from 'sass-module-importer';
import runSequence from 'run-sequence';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import notifier from 'node-notifier';
import postCssObjectFitImages from 'postcss-object-fit-images';

// Setup & Configuration
// ==============================

// Read .env file and store its contents in process.env variable
dotenv.config();

// NODE_ENV, should default to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// store all gulp plugins in $
const $ = gulpLoadPlugins()

// create browsersync
const browserSync = BrowserSync.create();

// Configuration
var config = {};

// base
config.siteName = 'peterle';
config.serverDir = './dist/'

// source
config.src = './src/';

// entry files
config.entries = {
  scss: config.src + 'css/main.scss',
}

// globs
config.globs = {
  scss: config.src + 'css/**/*.scss',
  js: config.src + 'js/**/*.js',
  svg: config.src + 'images/svg/*.svg',
  img: config.src + 'images/layout/**/*',
  fonts: config.src + 'fonts/**/*',
  hugo: './site/**/*'

}

// destination directories
config.dest = './site/static/';
config.destJS = config.dest + 'js';
config.destCSS = config.dest + 'css';
config.destSVG = config.dest + 'images/svg';
config.destIMG = config.dest + 'images/layout';
config.destFonts = config.dest + 'fonts';

// Hugo arguments
config.hugoArgsDefault = ["-d", "../dist", "-s", "site", "-v", "--cleanDestinationDir"];
config.hugoArgsPreview = ["--buildDrafts", "--buildFuture"];


// Plumber error handler
// ==============================
function plumberErrorHandler(err) {
  // notify by console log
  $.util.log($.util.colors.white.bgRed("Build error:"), err.message);

  // notify by notification
  notifier.notify({
    title: config.siteName,
    message: '🚨 Build error! "' + err.message + '"'
  });

  this.emit('end');
}

// TASKS
// ==============================

// Environment handling tasks
// ==============================
gulp.task('set-dev-node-env', function() {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
  return process.env.NODE_ENV = 'production';
});


// STYLES TASK
// Compiles files from _scss into /dist/css
// Also does the usual autoprefixer/minify/linting stuff
// ==============================
var postCSSPostProcessors = [
  autoprefixer(),
  cssnano({
    preset: 'default',
  }),
  postCssObjectFitImages,
];

gulp.task('sass', ['stylelint'], function() {
  return gulp.src(config.entries.scss)
    .pipe($.plumber({
      errorHandler: plumberErrorHandler
    }))
    .pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.init()))
    .pipe($.sass({
      importer: moduleImporter(),
      outputStyle: ':compact',
      precision: 10
    }))
    .pipe($.postcss(postCSSPostProcessors))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe($.size({
      showFiles: true
    }))
    .pipe($.if(process.env.NODE_ENV === 'development', $.sourcemaps.write('./')))
    .pipe(gulp.dest(config.destCSS))
});

// STYLELINT TASK: Lint SCSS
// ==============================
gulp.task('stylelint', function () {
  return gulp.src(config.globs.scss)
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [{
        formatter: 'string',
        console: true,
      }]
    }));
});


// JS TASK: Compile JavaScript
// ==============================
gulp.task('js', ['eslint'], (cb) => {
  const myConfig = Object.assign({}, process.env.NODE_ENV === 'production' ? webpackConfigProd : webpackConfigDev);

  webpack(myConfig, (err, stats) => {
    if (err) throw new $.util.PluginError("webpack", err);
    cb();
  });
});


// ESLINT TASK: Lint JavaScript
// ==============================
gulp.task('eslint', function() {
  return gulp.src([config.globs.js])
    .pipe($.eslint())
    .pipe($.eslint.format())
});


// SVG TASK: Create SVG spritemap
// ==============================
gulp.task('svg', function() {
  var svgSpriteConfig = {
    log: 'info',
    svg: {
      namespaceClassnames: false
    },
    mode: {
      symbol: {
        dest: '.',
        sprite: 'sprite.svg'
      }
    }
  };

  return gulp.src(config.globs.svg)
    .pipe($.plumber({
      errorHandler: plumberErrorHandler
    }))
    .pipe($.svgSprite(svgSpriteConfig))
    .pipe(gulp.dest(config.destSVG))
});


// IMG TASK: Simply copy images
// ==============================
gulp.task('img', function() {
  return gulp.src(config.globs.img)
    .pipe($.plumber({
      errorHandler: plumberErrorHandler
    }))
    .pipe(gulp.dest(config.destIMG))
});


// FONTS TASK: Move all fonts in a flattened directory
// ==============================
gulp.task('fonts', () => (
  gulp.src(config.globs.fonts)
    .pipe($.flatten())
    .pipe(gulp.dest(config.destFonts))
    .pipe(browserSync.stream())
));

// SERVER TASK: Development server with browsersync & watcher
// ==============================
gulp.task("server", ["sass", "js", "img", "svg", "fonts"], () => {
  runSequence(['hugo']);

  // generates a port from a string
  function port (str, base = 3000) {
    return str
    .split("")
    .map((c, i) => c.charCodeAt(0) + i)
    .reduce((a, c) => a + c, 0) + base
  }

  browserSync.init({
    port: port(config.siteName),
    server: {
      baseDir: config.serverDir
    }
  });

  // watch all .scss files, recompile SASS
  $.watch(config.globs.scss, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('sass');
  });

  // watch all script files, recompile scripts
  $.watch(config.globs.js, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('js');
  });

  // watch all svg files, recompile SVG spritemap
  $.watch(config.globs.svg, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('svg');
  });

  // watch all image files, recopy images
  $.watch(config.globs.img, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('img');
  });

  // watch all image files, recopy images
  $.watch(config.globs.fonts, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('fonts');
  });

  // watch all hugo template files, rebuild hugo
  $.watch(config.globs.hugo, function(vinyl) {
    $.util.log($.util.colors.underline('\nFile changed: ' + vinyl.relative));
    gulp.start('hugo');
  });
});


// HUGO TASKS: Run hugo and build the site
// ==============================
gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, config.hugoArgsPreview));

// buildSite async helper
function buildSite(cb, options) {
  const args = options ? config.hugoArgsDefault.concat(options) : config.hugoArgsDefault;

  return spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      // TODO unify with plumber / make it a stream
      notifier.notify({
        title: config.siteName,
        message: '🚨 Build error! "Hugo build failed"'
      })
      cb("Hugo build failed");
    }
  });
}



// PRODUCTION TASK: Set NODE_ENV to production and build files
// ==============================
gulp.task('build', callback =>
  runSequence(
    'set-prod-node-env',
    ['sass', 'js', 'svg', 'img', 'fonts'],
    'hugo',
    callback
  )
);

gulp.task('build-preview', callback =>
  runSequence(
    'set-prod-node-env',
    ['sass', 'js', 'svg', 'img', 'fonts'],
    'hugo-preview',
    callback
  )
);

// DEFAULT TASK: Server Task
// ==============================
gulp.task('default', ['server']);
