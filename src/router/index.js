import { createRouter, createWebHistory } from "vue-router"; // 依赖注入所需api
import Home from '../pages/home.vue'
import About from '../pages/about.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出
export default router