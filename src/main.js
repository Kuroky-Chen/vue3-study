import { createApp } from 'vue'
import App from './App.vue'

// 引入Vuex
import store from './store/index'

// 引入路由
import router from './router/index'

// 引入Element3
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.use(router).use(store).use(Element3).mount('#app')
