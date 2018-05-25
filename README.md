# peterle Website 🏨

**Website for Hotel & Restaurant Peterle http://www.hotel-peterle.de/**

This website is based on [Hugo](https://gohugo.io/) as a static site generator and [Gulp](https://gulpjs.com/) + [Webpack](https://webpack.js.org/) as the asset pipeline tools. Originally it's a heavily modified fork of [victor-hugo](https://github.com/netlify/victor-hugo).

This project is released under the [GPL-3.0](LICENSE). Please make sure you understand its implications and guarantees.

## Usage

### Prerequisites

You need to have the latest/LTS [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) versions installed in order to build this site.

Next step, clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary.

### Development

While developing your website, use:

```bash
gulp
```

A new browser should pop up to preview the site. BrowserSync will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
gulp build
```

To get a preview of posts or articles not yet published, run:

```bash
gulp build-preview
```

See [gulpfile.js](gulpfile.js) for all tasks.

## Structure

```
|--site                // Everything in here will be built with hugo
|  |--content          // Pages and collections - ask if you need extra pages
|  |--data             // YAML data files with any data for use in examples
|  |--layouts          // This is where all templates go
|  |  |--partials      // This is where includes live
|  |  |--index.html    // The index page
|  |--static           // Files in here ends up in the public folder
|--src                 // Files that will pass through the asset pipeline
|  |--css              // CSS (actually SASS) files in the root of this folder will end up in /css/...
|  |--js               // app.js will be compiled to /app.js with babel
```

## Basic Concepts

You can read more about Hugo's template language in their documentation here:

https://gohugo.io/templates/overview/

The most useful page there is the one about the available functions:

https://gohugo.io/templates/functions/

For assets that are completely static and don't need to go through the asset pipeline,
use the `site/static` folder. Images, font-files, etc, all go there.

Files in the static folder ends up in the web root. So a file called `site/static/favicon.ico`
will end up being available as `/favicon.ico` and so on...

The `src/js/app.js` file is the entrypoint for webpack and will be built to `/dist/app.js`.

You can use **ES6** and use both relative imports or import libraries from npm.

## Environment variables

To separate the development and production *- aka build -* stages, all gulp tasks run with a node environment variable named either `development` or `production`.

You can access the environment variable inside the theme files with `getenv "NODE_ENV"`. See the following example for a conditional statement:

    {{ if eq (getenv "NODE_ENV") "development" }}You're in development!{{ end }}

All tasks starting with *build* set the environment variable to `production` - the other will set it to `development`.

## SVG Prepare Task

Prepares SVGs for use within SVG sprite:

```
svgo ./logo-farbig.svg -o ../../grashobber/src/images/svg/logo-farbig.svg --config '{ "plugins": [ { "inlineStyles": { "onlyMatchedOnce": false } }] }'
```

## Enjoy!! 😸
