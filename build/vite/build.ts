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
  input: string,
  template: string,
  filename: string,
  // chunks: string[]
}

const pagesObj: pageObjMap = {};
const filter = './src/modules/**/main.ts';
const inputOptin: InputOption = {}

glob.sync(filter).forEach(pathItem => {
  const chunk: string = pathItem.split('./src/modules/')[1].split('/main.ts')[0];
  let filename = `${chunk}/index.html`;
  if (chunk === 'index') {
    filename = 'index.html';
  }
  const page: pageInfo = {
    input: pathItem,
    template: `./src/modules/${chunk}/page/index.html`,
    filename,
    // chunks: ['chunk-vendors', 'chunk-common', 'runtime', chunk],
  }

  inputOptin[chunk] = path.resolve(process.cwd(), page.input)

  pagesObj[chunk] = page;
})

const rollupOptions: RollupOptions = {
  // output: {
  //   entryFileNames: 'entry-[name]-[hash].js',
  // }
}

rollupOptions.input = inputOptin


export function createBuild(conf: createBuildConf): buildInfo {
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
    },
    pages: pagesObj
  }
}