import { createApp } from 'vue'
import App from './App.vue'
// import "/@/vue.main"
import ext from "/@/common/vue.ext"

console.log('ext :>> ', ext.bus);

ext.$bus.$on('test', () => {
  console.log('test :>> ', 11111111111);
})


const app = createApp(App)
app.mount('#app')
