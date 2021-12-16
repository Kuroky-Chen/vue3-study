import { createApp } from 'vue'
import App from './App.vue'
// 引入Vuex
import store from './store/index'
// 引入路由
import router from './router/index'

const app = createApp(App)

app.use(router).use(store).mount('#app')
