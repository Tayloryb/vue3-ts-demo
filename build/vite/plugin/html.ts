import type { HtmlTagDescriptor, PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'
import type { pageObjMap, pageInfo } from '../build'
import path from 'path'

type HtmlPluginPara = {
  env: ViteEnv,
  isBuild: boolean
  pages: pageObjMap
}

type InjectOptions = {
  /**
   *  @description Data injected into the html template
   */
  data?: Record<string, any>;
  tags?: HtmlTagDescriptor[];
}

type PageOption = {
  filename: string;
  template: string;
  entry?: string;
  injectOptions?: InjectOptions;
}

export function configHtmlPlugin(para: HtmlPluginPara) {
  const { env, isBuild, pages } = para
  console.log('pages :>> ', pages)

  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env
  const basePath = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  const getScriptSrc = (page: pageInfo) => {
    return `${basePath || '/'}${page.filename}?v=${pkg.version}-${new Date().getTime()}`
  }
  console.log('VITE_GLOB_APP_TITLE :>> ', VITE_GLOB_APP_TITLE)


  const pagesConf = Object.values(pages).map(page => {
    console.log('getScriptSrc(page) :>> ', getScriptSrc(page))
    const pageOption: PageOption = {
      filename: path.resolve(process.cwd(), page.filename),
      template: path.resolve(process.cwd(), page.template),
      entry: page.entry
      // injectOptions: {
      //   // Inject data into ejs template
      //   data: {
      //     title: VITE_GLOB_APP_TITLE,
      //   },
      //   // Embed the generated app.config.js file
      //   tags: isBuild
      //     ? [
      //         {
      //           tag: 'script',
      //           attrs: {
      //             src: getScriptSrc(page),
      //           },
      //         },
      //       ]
      //     : [],
      // },
    }
    return pageOption
  })
  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    pages: pagesConf
  })
  
  return htmlPlugin
}