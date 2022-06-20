import { createApp } from 'vue'
import App from './App.vue'
import "/@/vue.main"
import bus from "/@/common/vue.bus"

bus.$on("test", () => {
  console.log('1111 :>> ', 1111);
})

bus.$on("test", () => {
  console.log('1111 :>> ', 2313133);
})

bus.getList()

bus.$emit("test")


const app = createApp(App)


app.mount('#app')
