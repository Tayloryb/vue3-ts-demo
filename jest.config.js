// const {
//   default: tsjPreset
// } = require('ts-jest/utils')
// console.log('tsjPres :>> ', tsjPreset)

module.exports = {
  preset: 'ts-jest',
  // 以 <rootDir>/src 这个目录做为根目录来搜索测试文件（模块）
  rootDir: './',
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    // ...tsjPreset.transform
    // .vue文件用 vue-jest 处理
    '^.+\\.vue$': 'vue-jest',
    // .js或者.jsx用 babel-jest处理
    '^.+\\.jsx?$': 'babel-jest',
    //.ts文件用ts-jest处理
    '^.+\\.ts$': 'ts-jest'
  },
  //   testMatch: ['**/?(*.)+(spec).[jt]s?(x)']
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)?(x)'], // 从文件中寻找测试文件
  /**
   * 测试代码覆盖率
   * % stmts 是语句覆盖率 （statement coverage）： 每个语句是否都执行了
   * % Branch分支覆盖率 （branch coverage）： 条件语句是否都执行了
   * % Funcs 函数覆盖率 （function coverage）: 函数调用
   * % Lines 行覆盖率 （line coverage）: 未执行的代码行数
   */
  collectCoverage: false, // 是否收集测试时覆盖率
  collectCoverageFrom: [
    'src/test/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/**/*.d.ts'
  ],
  coveragePathIgnorePatterns: ['node_modules'], // 排除哪些目录或文件跳过覆盖率信息
  coverageReporters: ['text'], // 控制台输出覆盖率报告， 值为text 或者 text-summary
  // coverageThreshold: { // 最小覆盖率指标（如果所有文件指标小于预设值，则测试失败）
  //   // * 匹配0或者多个字符（不包括目录分割符）
  //   // ? 匹配一个任意字符 （不包括目录分割符）
  //   // **/ 递归匹配任意子目录
  //   // 文件目录或文件，也可以是global属性（这里应该是相对路径开头，如：./src. 使用递归模式**/开头会减慢测试速度）
  //   'src/test/**/*.{js,jsx,ts,tsx}': {
  //     branch: 50,
  //     functions: 60,
  //     lines: 60,
  //     statements: -10
  //   }
  // },
  extraGlobals: [ // 加快查找全局属性（如：Math, document, window这类的全局属性）
    'Math'
  ],
  // 指定被忽略测试覆盖率的文件，使其让这些文件中收集覆盖率（也可以递归搜索，如：./src/test/**/*.ts）
  forceCoverageMatch: ['./src/test/force.spec.ts'],
  moduleFileExtensions: [ // 查找扩展名（常用的文件扩展名应在最前，如果项目中有多个扩展名，则最多的文件扩展名优先最前）
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'scss',
    'css'
  ],
  moduleNameMapper: { // 模块名映射（也就是匹配模块的名称，其中属性名相当于webpack中的alias别名， $1为捕获组的引用，需指定边界）
    '^/@/(.*)$': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/build'], // 防止意外忽略不同环境中具有不同目录的所有文件（production）
  notify: false, // 是否显示测试结果通知（这个通知是从系统通知中发出的）
  /**
   * always: 总是发送通知
   * failure: 测试失败时发送通知
   * success: 测试通过时发送通知
   * change: 当状态改变时发送通知
   * success-change: 当测试通过或失败时发送通知
   * failure-change: 当测试失败时发送通知，或者当测试通过时发送一次通知
   */
  // 默认值为： failure-change（前提需要指定notify: true）
  notifyMode: 'always',
  // 自定义测试报告
  // 当没有default时候，自定义测试报告会覆盖默认的测试报告
  // 如需使用默认的测试报告和自定义测试报告的话，可以吧默认的测试报告导入进来（不会覆盖）
  // 还可以传一个option配置对象，这个对象将传入自定义测试报告的构造函数的第二个参数， 如下：
  reporters: [
    'default'
    // [
    //   '<rootDir/my-custom-reporter.js>',
    //   {
    //     'banana': 'yes',
    //     'pineapple': 'no'
    //   }
    // ]
  ],
  // 默认情况下，每个测试文件都有自己独立的模块注册表
  resetModules: true, // 重置模块注册表（确保本地模块状态不会在测试之间发生冲突）
  moduleDirectories: ['node_modules', '/src']
}