<template>
  <div :style="fontStyle">
    <div class="rate" @mouseout="onMouseOut">
      <span @mouseover="onMouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontWidth">
        <span @click="onRate(num)" @mouseover="onMouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, defineEmits } from 'vue'
let props = defineProps({
  // value: Number,
  modelValue: Number,
  theme: {
    type: String,
    default: 'red'
  }
})
console.log(props)
let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.modelValue, 10 - props.modelValue))
const themeObj = { 'black': '#00', 'white': '#fff', 'red': '#f5222d', 'orange': '#fa541c', 'yellow': '#fadb14', 'green': '#73d13d', 'blue': '#40a9ff', }
const fontStyle = computed(() => {
  return `color: ${themeObj[props.theme]}`
})

let width = ref(props.modelValue)
const fontWidth = computed(() => `width:${width.value}em;`)
function onMouseOut() {
  width.value = props.modelValue
}
function onMouseOver(i) {
  width.value = i
}
// let emits = defineEmits(['update-rate']) // 定义emits
let emits = defineEmits(['update:modelValue']) // 自定义model
function onRate(num) {
  // emits('update-rate',num)
  emits('update:modelValue', num)
}

</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>