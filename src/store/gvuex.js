import { inject, reactive } from "vue";
// 简易版的vuex
const STORE_KEY = '__store__'

// 通过provide和inject来实现

// 通过inject获取store并返回
function useStore() {
  return inject(STORE_KEY)
}

// 创建一个store实例并返回
function createStore(options) {
  return new Store(options)
}

class Store {
  constructor(options) {
    this.$options = options
    // 创建一个响应式数据_state
    this._state = reactive({
      data: options.state()
    })
    // 获取mutations
    this._mutations = options.mutations
  }
  // main.js入口处app.use(store)的时候，会执行这个函数
  install(app) {
    app.provide(STORE_KEY, this)
  }
  // 想要读取state的时候直接返回响应式数据
  get state() {
    return this._state.data
  }
  commit = (type, payload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }
}

export { createStore, useStore }