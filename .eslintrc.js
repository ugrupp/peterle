module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    __dirname: true,
    process: true
  }
};
