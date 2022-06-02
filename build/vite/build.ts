/// <reference types="vite/client" />
import { BuildOptions } from "vite"
import path from "path"
// import glob from "@types/glob"

const filter = path.resolve(process.cwd(), '/src/modules/**/main.js');
console.log('filter :>> ', filter, import.meta);

// const pages = import.meta.globEager(filter)

// console.log('pages :>> ', pages);

export function createBuild(outDir: string): BuildOptions {
  return {
    target: 'es2015',
    cssTarget: 'chrome80',
    outDir: outDir,
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
  }
}