"use strict"

module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss"
  ],
  "ignoreFiles": "./src/css/vendor/**",
  "rules": {
    "max-empty-lines": 2,
    "declaration-empty-line-before": null,
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "number-leading-zero": "never",
    "at-rule-empty-line-before": ["always", {
      except: [
        "blockless-after-same-name-blockless",
        "first-nested",
      ],
      ignore: ["after-comment"],
      ignoreAtRules: [
        "else",
        "include"
      ]
    }],
  }
}
