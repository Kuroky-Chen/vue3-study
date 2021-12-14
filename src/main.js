import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
import router from './router/index'

createApp(App).use(router).mount('#app')
