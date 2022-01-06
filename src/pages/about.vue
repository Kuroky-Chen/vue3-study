
<template>
	<h1>about</h1>
	<!-- <Rate @update-rate='update' :value='obj.count' theme='blue' /> -->
	<Rate v-model="obj.count" theme='blue' />
  <Heading :level="1">hello jsx</Heading>
</template>
<script setup> 
import Rate from '../components/Rate.vue'
import Heading from '../components/Heading'
import { reactive, computed, watchEffect } from 'vue'
let obj = reactive({
	count: 1
})
let double = computed(() =>
	obj.count * 2
)

obj.count = 4

function update(num) {
	obj.count = num
}
watchEffect(() => {
	console.log('数据被修改了', obj.count, double.value)
})
</script>
<style scoped>
</style>