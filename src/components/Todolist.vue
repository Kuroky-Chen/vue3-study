
<template>
  <!-- 清单代码 -->
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="i">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
  </div>
  <!-- 优化代码 -->
  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">请输入学习计划</div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";

// 清单代码
let title = ref("");
let todos = ref([{ title: '学习Vue', done: false }])
let showModal = ref(false)

function addTodo() {
  if (!title.value) {
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 1500)
    return
  }
  todos.value.push({ title: title.value, done: false, })
  title.value = ""
}
function clear() {
  todos.value = todos.value.filter((v) => !v.done);
}
// 没完成的，正在进行的
let active = computed(() => {
  return todos.value.filter(v => !v.done).length
})
let all = computed(() => todos.value.length);
let allDone = computed({
  get: function () {
    return active.value === 0;
  },
  set: function (value) {
    todos.value.forEach((todo) => {
      todo.done = value;
    });
  },
});


</script>

<style>
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
  left: 50%;
  margin-left: -100px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>