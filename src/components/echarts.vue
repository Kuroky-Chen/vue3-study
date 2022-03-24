<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import { ref, onMounted, onUnmounted, defineProps } from 'vue'

  let props = defineProps({
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  })

  // 通过ref获得DOM
  let chartRef = ref()
  let myChart

  onUnmounted(() => {
    myChart.dispose()
    myChart = null
  })

  onMounted(() => {
    myChart = echarts.init(chartRef.value)
    myChart.setOption(this.props.options)
  })
</script>

<style>

</style>