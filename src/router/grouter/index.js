
import { ref, inject } from 'vue'
// 注册routerView和routerLink组件
import RouterLink from './RouterLink.vue'
import RouterView from './RouterView.vue'
// 使用provide和inject来实现
const ROUTER_KEY = '__router__'

// 返回一个router实例
function createRouter(options) {
  return new Router(options)
}

// 通过inject获取router数据
function useRouter() {
  return inject(ROUTER_KEY)
}

// 创建 createWebHashHistory 方法
function createWebHashHistory() {
  function bindEvents(fn) {
    window.addEventListener('hashchange', fn)
  }
  // 返回当前url和监听hashchange
  return {
    bindEvents,
    url: window.location.hash.slice(1) || '/'
  }
}
class Router {
  constructor(options) {
    this.history = options.history
    this.routes = options.routes
    this.current = ref(this.history.url)

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1)
    })
  }
  install(app) {
    app.provide(ROUTER_KEY, this)
    app.component('router-link', RouterLink)
    app.component('router-view', RouterView)
  }
}

export { createRouter, createWebHashHistory, useRouter }