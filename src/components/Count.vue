<template>
  <div @click="add">
    {{ count }} * 2 = {{ double }}
  </div>
  <button @click="asyncAdd">async add</button>
</template>

<script setup>
import bus from './bus.js'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

let store = useStore()
let count = computed(() => store.state.count)
let double = computed(() => store.getters.double)
const router = useRouter()

function add() {
  debugger
  router.push({ name: 'About' })
  setTimeout(() => {
    debugger
    bus.emit('cc', 8)
  })
  store.commit('add')
}
function asyncAdd() {
  store.dispatch('asyncAdd')
}
</script>

<style>
</style>