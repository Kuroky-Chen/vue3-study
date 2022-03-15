<template>
  <div>TypeScript</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface course {
  name: string,
  price: number
}

const msg = ref('') // 根据输入参数推导字符串类型
const msg1 = ref<string>('') // 可通过泛型显示约束

const obj = reactive({})
const course = reactive<course>({
  name: '玩转vue3',
  price: 998
})

const msg2 = computed(() => '') // 默认参数推导
const course2 = computed<course>(() => {
  return {
    name: '玩转vue3',
    price: 998
  }
})

// export default defineComponent({
//   function getProperty<T, K extends typeof T>(o: T, name: K): T[K] {
//     return o[name]
//   }
// })

// let count = ref(1)
// count.value.split('')
// Property 'split' does not exist on type 'number'


</script>

<style scoped lang="less">
</style>