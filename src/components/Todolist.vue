
<template>
  <!-- 清单代码 -->
  <div>
    <span class="dustbin">🗑</span>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
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
  <!-- 动画代码 -->
  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">请输入学习计划</div>
    </div>
  </transition>

  <div class="animate-wrap">
    <transition @before-enter="beforeEnter" @enter='enter' @after-enter='afterEnter'>
      <div class="animate" v-show="animate.show">📋</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

// 清单代码
let title = ref("");
let todos = ref([{ title: '学习Vue', done: false }])
let showModal = ref(false)
let animate = reactive({
  show: false,
  el: null
})

function beforeEnter(el) {
  let dom = animate.el
  let rect = dom.getBoundingClientRect()
  let x = window.innerWidth - rect.left - 60
  let y = rect.top - 10
  el.style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el, done) {
  el.style.transfrom = `translate(0px, 0px)`
  el.addEventListener('transitionend', done)
}

function afterEnter(el) {
  debugger
  animate.show = false
  el.style.display = 'none'
}

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

// 删除一行
function removeTodo(e, i) {
  animate.el = e.target
  animate.show = true
  todos.value.splice(i, 1)
}

</script>

<style>
.remove-btn {
  padding: 3px;
  cursor: pointer;
}
.dustbin {
  font-size: 20px;
  position: fixed;
  right: 10px;
  top: 10px;
}
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
/* .flip-list-move {
  transition: transform 0.8s ease;
} */
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all .5s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 11px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>