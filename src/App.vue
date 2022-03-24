
<template>
  <el-container>
    <div id="teleport-wrap"></div>
    <el-header>
      <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template v-slot:title>我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template v-slot:title>选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">
          <a href="https://element3-ui.com" target="_blank">订单管理</a>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div>
          <router-link to="/">Home</router-link>
        </div>
        <div>
          <router-link to="/about">About</router-link>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
// function fib(n) {
//   if (n <= 1) return 1
//   return fib(n - 1) + fib(n - 2)
// }
function fib(n) {
  let arr = [1, 1]
  let i = 2
  while (i <= n) {
    arr[i] = arr[i - 1] + arr[i - 2]
    i++
  }
  return arr[n]
}
let count = ref(fib(38))
console.log(count)



let timing = window.performance && window.performance.timing
console.log(timing)

let navigation = window.performance && window.performance.navigation
console.log(navigation)

let dns = timing.domainLookupEnd - timing.domainLookupStart
console.log(`DNS 解析：${dns}`)

let network = timing.responseEnd - timing.navigationStart
console.log(`总体网络交互耗时：${network}`)

let processing = (timing.domComplete || timing.domLoading) - timing.domLoading
console.log(`渲染处理：${processing}`)

let active = timing.domInteractive - timing.navigationStart
console.log(`可交互：${active}`)
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
