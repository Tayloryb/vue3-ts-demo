import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';
import type { pageObjMap, pageInfo } from "../build"

type HtmlPluginPara = {
  env: ViteEnv,
  isBuild: boolean
  pages: pageObjMap
}

export function configHtmlPlugin(para: HtmlPluginPara) {
  const { env, isBuild, pages } = para

  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env;
  const htmlPlugin: PluginOption[] = []
  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`;

  const getScriptSrc = (page: pageInfo) => {
    return `${path || '/'}${page.filename}?v=${pkg.version}-${new Date().getTime()}`;
  };

  Object.values(pages).forEach(page => {
    console.log('page :>> ', page);
    const singleHtml = createHtmlPlugin({
      minify: isBuild,
      inject: {
        // Inject data into ejs template
        data: {
          title: VITE_GLOB_APP_TITLE,
        },
        // Embed the generated app.config.js file
        tags: isBuild
          ? [
              {
                tag: 'script',
                attrs: {
                  src: getScriptSrc(page),
                },
              },
            ]
          : [],
      },
      template: page.template
    });
    htmlPlugin.push(singleHtml)
  })
  
  return htmlPlugin
}