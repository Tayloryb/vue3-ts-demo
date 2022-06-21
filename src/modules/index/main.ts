import { createApp } from 'vue'
import App from './App.vue'
import "/@/vue.main"

/** store */
import { setupStore } from "/@/store/index"

/** router */
import { router } from "./router"
import { setupRouter } from '/@/router'


import { setUpExt } from "/@/common/vue.ext"

const app = createApp(App)
// 注册全局工具函数
setUpExt(app)

/** 注册状态管理 */
setupStore(app)

/** 注册路由 */
setupRouter(app, router)

app.mount('#app')

