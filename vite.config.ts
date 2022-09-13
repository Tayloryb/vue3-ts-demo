import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
// import path from 'path'
import { resolve } from 'path'
import { wrapperEnv, isProdFn } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'
import { createBuild } from './build/vite/build'
import { OUTPUT_DIR } from './build/constant'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

(() => {
  const dateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  process.env.VUE_APP_RELEASE_VERSION = `${process.env.VUE_APP_RELEASE_VERSION}_${dateTime}`
})()


export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const htmlRoot = './src/modules'

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  // 获取多页面配置信息
  const buildConf = createBuild({
    outDir: OUTPUT_DIR
  })


  const plugins = createVitePlugins({
    pages: buildConf.pages,
    viteEnv,
    isBuild
  })

  return {
    base: VITE_PUBLIC_PATH,
    root: htmlRoot,
    resolve: {
      alias: [
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        // },
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        },
        {
          find: /\/@css\\/,
          replacement: pathResolve('src/assets/css') + '/'
        }
      ]
    },
    server: {
      https: isProdFn(mode),
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: buildConf.build,
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: plugins,

    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared'
        // '@iconify/iconify',
        // 'ant-design-vue/es/locale/zh_CN',
        // 'ant-design-vue/es/locale/en_US',
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          // src\assets\css\index.scss
          additionalData: '@import "/@/assets/css/index.scss";'
        }
      }      
    }
  }
}
