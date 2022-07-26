import type { App } from 'vue'

class VApp {
  vueInst: App | null = null
  serverUrl: App | null = null
  constructor() {
    console.log('111 :>> ', 111)
  }

  static init(): VApp {
    return new VApp()
  }

}

const vm:VApp =  VApp.init()

export default vm
