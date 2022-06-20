import vApp from "./vue.app"
import eventBus from "./vue.bus"

const getProperties: { [key: string]: any } = () => ({
  vApp: vApp,
  bus: eventBus,
})

export default {
  getProperties
}
