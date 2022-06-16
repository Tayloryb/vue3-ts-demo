import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configMockPlugin } from './mock';
import { configHtmlPlugin } from './html';
import type { pageObjMap } from "../build"

type pluginPara = {
  pages: pageObjMap
  viteEnv: ViteEnv,
  isBuild: boolean
}

export function createVitePlugins(para: pluginPara) {
  const { viteEnv, isBuild, pages } = para
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = para.viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
  ]

  // 是否使用mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(para.isBuild));

  // vite-plugin-html
  // vitePlugins.push(configHtmlPlugin({
  //   env: viteEnv,
  //   isBuild,
  //   pages,
  // }));

  console.log('vitePlugins :>> ', vitePlugins);

  return vitePlugins
}