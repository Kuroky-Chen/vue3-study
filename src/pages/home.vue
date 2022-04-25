
<template>
  <h1>home</h1>
  <TodoList :data='data' />
  <!-- <TodoListJsx /> -->
  <Count />
</template>

<script setup>
import { reactive } from 'vue'
import TodoList from '../components/Todolist.vue'
import TodoListJsx from '../components/Todo.jsx'
import Count from '../components/Count.vue'

let data = reactive({
  name: 'cc',
  age: 18
})
</script>