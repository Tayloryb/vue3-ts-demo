import { BuildOptions } from "vite"
import type { RollupOptions, InputOptions, InputOption } from 'rollup'
import * as glob from 'glob'
import path from 'path'

type createBuildConf = {
  outDir: string
}
export type pageObjMap = { [k: string]: pageInfo }

type buildInfo = {
  build: BuildOptions,
  pages: pageObjMap
}

export type pageInfo = {
  entry: string,
  template: string,
  filename: string,
  // chunks: string[]
}

const pagesObj: pageObjMap = {};
const filter = './src/modules/**/main.ts';
const inputOptin: InputOption = {}

// const homePage = {
//   entry: './src/main.ts',
//   template: './src/index.html',
//   filename: 'index.html'
// }
// inputOptin['home'] = path.resolve(process.cwd(), homePage.template)
// pagesObj['home'] = homePage

glob.sync(filter).forEach(pathItem => {
  let chunk: string = pathItem.split('./src/modules/')[1].split('/main.ts')[0];
  let template = `./src/modules/${chunk}/index.html`
  // 入口页面
  if (chunk === 'main.ts') {
    chunk = 'home';
    template = './src/modules/index.html'
  }
  let filename = `${chunk}/index.html`;
  const page: pageInfo = {
    entry: pathItem,
    template,
    filename,
    // chunks: ['chunk-vendors', 'chunk-common', 'runtime', chunk],
  }

  inputOptin[chunk] = path.resolve(process.cwd(), page.template)

  pagesObj[chunk] = page;
})

console.table(pagesObj);

export function createBuild(conf: createBuildConf): buildInfo {
  const rollupOptions: RollupOptions = {
    output: {
      chunkFileNames: 'static/js/[name]_[hash].js',
      entryFileNames: 'static/js/[name]_[hash].js',
      assetFileNames: 'static/[ext]/[name]_[hash].[ext]'
    }
  }
  
  rollupOptions.input = inputOptin
  return {
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: conf.outDir,
      rollupOptions,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      emptyOutDir: true
    },
    pages: pagesObj
  }
}