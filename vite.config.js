import { resolve } from "path";
import { defineConfig } from "vite";
import hugoPlugin from "vite-hugo-plugin";
import eslint from "vite-plugin-eslint";
import StylelintPlugin from "vite-plugin-stylelint";
import svgSpritePlugin from "vite-plugin-svg-sprite-component";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  publicDir: "public",
  plugins: [
    eslint({
      include: "site/assets/js/**/*.js",
      exclude: "site/assets/js/vendor/**/*",
      failOnError: false,
    }),
    StylelintPlugin({
      include: "site/assets/css/**/*.scss",
      exclude: "site/assets/css/vendor/**/*",
      emitErrorAsWarning: true,
    }),
    svgSpritePlugin({ symbolId: (name) => "icon-" + name }),
    hugoPlugin({
      appDir: resolve(__dirname, "site"),
      hugoOutDir: resolve(__dirname, "dist"),
    }),
  ],
});
