import { createApp } from 'vue'
import App from './App.vue'
// import "/@/vue.main"
import ext from "/@/common/vue.ext"

console.log('ext :>> ', ext.bus);

ext.$bus.$on('test', () => {
  console.log('test :>> ', 222222222222);
})

ext.$bus.$emit('test')

const app = createApp(App)
app.mount('#app')
