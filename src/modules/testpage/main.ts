import { createApp } from 'vue'
import App from './App.vue'
import '/@/vue.main'

import ElContainer from '/@/components/container/index'


const app = createApp(App)

app.use(ElContainer).mount('#app')
