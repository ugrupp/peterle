module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: ["import"],
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    indent: [2, 2],
    eqeqeq: 2,
    'no-bitwise': 2,
    'no-use-before-define': 2,
    strict: [2, 'global'],
    'dot-notation': 2,
    'space-infix-ops': 2,
    'max-len': [2, 220],
    'require-jsdoc': 0,
    'import/no-unresolved': [2, {commonjs: true, amd: true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
  },
  globals: {
    __dirname: true,
    process: true
  }
};
