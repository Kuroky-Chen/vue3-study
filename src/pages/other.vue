<template>
  <div>其他页</div>
</template>

<script setup>
  let arr = [1, 2, 3, 4, 5, 6]
  arr.reduce((p, c, index, array) => {
    debugger
    return p + c
  })
</script>
