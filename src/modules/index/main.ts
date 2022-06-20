import { createApp } from 'vue'
import App from './App.vue'
import "/@/vue.main"
import bus from "/@/common/vue.bus"

bus.$on("test", () => {
  console.log('1111 :>> ', 22222);
})

bus.getList()


import { setUpExt } from "/@/common/vue.ext"

const app = createApp(App)
// 注册全局工具函数
setUpExt(app)
app.mount('#app')

