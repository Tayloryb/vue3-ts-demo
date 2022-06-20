import type { App } from "vue"
import vApp from "./vue.app"
import eventBus from "./vue.bus"

// const getProperties: { [key: string]: any } = () => ({
//   vApp: vApp,
//   bus: eventBus,
// })

export function setUpExt(app: App<Element>) {
  app.config.globalProperties.$bus = eventBus
  app.config.globalProperties.$vApp = vApp
}
