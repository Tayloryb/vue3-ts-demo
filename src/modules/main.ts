import { createApp } from 'vue'
import App from './App.vue'
// import "/@/vue.main"
import { setUpExt } from "/@/common/vue.ext"

const app = createApp(App)
// 注册全局工具函数
setUpExt(app)


app.mount('#app')
