const {
  defineConfig
} = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  globals: {
    // vue的setup宏
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
    // "@vue/typescript/recommended",
    // "@vue/prettier",
    // "plugin:prettier/recommended",
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'import/no-unresolved': [
      'off',
      {
        caseSensitive: true
      }
    ],
    'no-continue': 'off',
    'arrow-parens': 'off',
    // 优先使用数组和对象解构
    'prefer-destructuring': 'off',
    // 强制使用一致的换行符风格
    // 'linebreak-style': ['error', 'unix'],
    //关闭禁止使用空方法
    'no-empty-function': 'error',
    //关闭多空格检查
    'indent': 'off',
    // 开启变量修饰
    'prefer-const': 'error',
    // 禁止使用var修饰变量
    'no-var': 'error',
    // 关闭禁止使用undefind
    'no-undefined': 'error',
    'prefer-object-spread': 'off',
    //不允许多个空行
    'no-multiple-empty-lines': 'error',
    'one-var-declaration-per-line': 'error',
    // 字符串使用单引号
    'quotes': ['error', 'single'],
    // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    'for-direction': 'error',
    // getter 必须有返回值，并且禁止返回空，比如 return;
    'getter-return': [
      'error',
      {
        allowImplicit: false
      }
    ],
    // 强制在花括号内使用一致的换行符
    // 'object-curly-newline': ['error',
    //     { 'multiline': true }
    // ],
    // 允许扩展原始对象方法
    'no-extend-native': 'off',
    // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
    // @off 要求太严格了，有时需要在循环中写 await
    'no-await-in-loop': 'error',
    // 禁止与负零进行比较
    'no-compare-neg-zero': 'error',
    // 禁止在 if, for, while 里使用赋值语句，除非这个赋值语句被括号包起来了
    'no-cond-assign': [
      'error',
      'except-parens'
    ],
    'no-param-reassign': ['error', {
      'props': false
    }],
    // 打包时禁止debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 打包时禁止console
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止使用 console
    'no-console': 'off',
    // 禁止将常量作为 if, for, while 里的测试条件，比如 if (true), for (;;)，除非循环内部有 break 语句
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
    'max-len': [
      'error', {
        'code': 180,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ],
    // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
    // 开启此规则，因为字符串中一般不会出现 Ctrl 键，所以一旦出现了，可能是一个代码错误
    'no-control-regex': 'error',
    // 禁止在函数参数中出现重复名称的参数
    'no-dupe-args': 'error',
    // 禁止在对象字面量中出现重复名称的键名
    'no-dupe-keys': 'error',
    // 禁用__proto__
    'no-proto': 'error',
    // 禁止自身比较
    'no-self-compare': 'error',
    // 不允许使用逗号操作符
    'no-sequences': 'error',
    // 关闭语句强制分号结尾
    // 'semi': [2, 'never'],
    // 要求必须有基数
    'radix': 'error',
    // 禁用与变量同名的标签
    'no-label-var': 'error',
    // 不允许初始化变量值为 undefined
    'no-undef-init': 'error',
    'no-mixed-operators': 'off',
    // 要求使用拖尾逗号
    'comma-dangle': ['error'],
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 'error',
    '@typescript-eslint/no-var-requires': 0,
    'vue/multi-word-component-names': 0
    // 'prettier/prettier': [
    //   'warn',
    //   {
    //     trailingComma: 'es5'
    //   }
    // ]
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    }
  } ]
})