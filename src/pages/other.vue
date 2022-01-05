<template>
  <div>其他页</div>
</template>

<script setup>
// let arr = [1, 2, 3, 4, 5, 6]
// let res = arr.reduce((p, c, index, array) => {
//   return p + c
// }, 10)

// var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

// var countedNames = names.reduce(function (allNames, name) {
//   debugger
//   if (name in allNames) {
//     allNames[name]++;
//   }
//   else {
//     allNames[name] = 1;
//   }
//   return allNames;
// }, {});

let htmlNode = Object.entries([...document.querySelectorAll('*')].map(v => v.tagName).reduce((res, a) => { res[a] = (res[a] || 0) + 1; return res; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 3)
console.log(htmlNode)
</script>
