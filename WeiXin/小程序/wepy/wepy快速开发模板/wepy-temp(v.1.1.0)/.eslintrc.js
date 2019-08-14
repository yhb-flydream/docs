module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // 在这里更改你的规则
  // https://www.cnblogs.com/-walker/p/8143715.html 这里有一份清单，可以根据需要修改规则，
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    // "semi": [0, "always"],
  }
};
