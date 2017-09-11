const path = require('path');
const resolve = (dir = '') => path.join(__dirname, dir);

module.exports = {
  root: true,
  extends: ['vue', 'airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
    env: {
      "browser": true,
      "node": true,
      "es6": true,
    }
  },
  plugins: [
    'vue',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: resolve('config/webpack.base.config.js'),
      },
    },
  },
  env: {
    browser: true,
  },
  globals: {
    frontEndTools: true,
    process: true,
    $: true,
    _: true,
    router: true,
    Parallax: true,
    echarts: true,
    lyg: true,
    i18n: true,
    MobileDetect: true,
    YKU: true,
  },
  rules: {
    'no-console': 0,
    'no-empty': 1,
    // 要求 require() 出现在顶层模块作用域中
    'global-require': 0,
    // 不允许修改 function 中的函数
    'no-param-reassign': 0,
    // 不允许在变量定义之前使用它们
    'no-use-before-define': 0,
    // 要求所有的 var 声明出现在它们所在的作用域顶部
    'vars-on-top': 0,
    // 要求使用 let 或 const 而不是 var
    'no-var': 0,
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: 0,
    // 禁止使用一元操作符 ++ 和 --
    'no-plusplus': 0,
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': 0,
    // 禁止 if 语句中有 return 之后有 else
    'no-else-return': 0,
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 0,
    // 禁止 var 声明 与外层作用域的变量同名
    'no-shadow': 0,
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 禁止混合使用不同的操作符
    'no-mixed-operators': 0,
    // 禁止标识符中有悬空下划线_bar
    'no-underscore-dangle': 0,
    // 禁止同事声明多个函数变量
    'no-multi-assign': 0,
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 1,
    // 禁止直接使用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止使用特定的语法
    'no-restricted-syntax': 0,
    // Suggest using the rest parameters instead of arguments
    'prefer-rest-params': 0,
    // 强制类使用此方法
    'class-methods-use-this': 1,
    // 强制每行只能小于等于120个字
    'max-len': [2, 120],
    // Forbid the use of extraneous packages
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    // 禁止出现未使用过的表达式
    'no-unused-expressions': 1,
    'no-trailing-spaces': 0,
    // 换行风格
    'linebreak-style': [0, 'Unix'],
    // 语句强制分号结尾
    semi: [1, 'always'],
    // 要求 for-in 循环中有一个 if 语句
    'guard-for-in': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [1, { vars: 'all', args: 'none' }],
    // 最后一行需要换行
    'eol-last': 0,
    // 不允许require
    'import/no-dynamic-require': 0,
    indent: 2,
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],     
    'vue/jsx-uses-vars': 2,
  },
};