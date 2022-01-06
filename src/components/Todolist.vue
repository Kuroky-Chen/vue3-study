
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
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
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

// 删除动画元素起始和最终位置和删除图标一起，在进入前改变删除动画元素位置
// 通过getBoundingClientRect获取元素距离视口坐标, 因为删除图标在右上角，所以删除元素偏移位置从右上角开始算起，也就是window.innerWidth - rect.left得到从左向右剩余位置
// 从元素起始位置作为0点，向列表移动，也就是向左，x就是负数，y不变
// 删除元素通过transition来添加动画效果
// 动画进入后偏移归零，这样就完成了鼠标删除数据位置到了删除图标位置的动画
function beforeEnter(el) {
  // 点击删除的时候获取当前几点元素的相关信息。然后赋值给删除元素
  let dom = animate.el
  let rect = dom.getBoundingClientRect()
  let x = window.innerWidth - rect.left - 60 // 删除图标出现的位置再往右偏 60，方便展示
  let y = rect.top - 10 // top相同
  el.style.transform = `translate(-${x}px, ${y}px)`
}

// done 监听动画结束进行下一个事件，没有done无法触发@after-enter
function enter(el, done) {
  // 手动触发一次重绘，开始动画,否则不会触发动画
  // 原因：enter 钩子需要手动重绘，还需要监听完成 el.addEventListener('transitionend',done)，完成之后才交到afterEnter
  document.body.offsetHeight
  // 删除元素回归初始位置，形成动画
  el.style.transform = `translate(0, 0)`
  // 监听元素的transitionend事件，如果完成开始告诉vue走afterEnter
  el.addEventListener('transitionend', done)
}

// 结束后隐藏动画元素
function afterEnter(el) {
  // 动画完毕后消灭元素
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
  // 获取删除元素的信息，准备赋值给删除图标
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
  transition: all 0.5s ease;
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