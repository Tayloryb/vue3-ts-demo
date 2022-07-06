import type { App } from 'vue'

class VApp {
  vueInst: App | null = null
  serverUrl: App | null = null
  constructor() {

  }

  static init(): VApp {
    return new VApp()
  }

}

const vm:VApp =  VApp.init()

export default vm
