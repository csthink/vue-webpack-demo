import Vue from 'vue';

// 渲染模板方式一
// new Vue({
//   el: '#root',
//   template: '<div>Hello Practice!</div>'
// })

// 渲染模板方式二
const app = new Vue({
  data: {
    text: 0,
    obj: {}
  },
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`newText: ${newText}, oldText: ${oldText}`)
  //   }
  // },
  template: '<div ref="div">{{text}} {{obj.a}}</div>'
})

app.$mount('#root')

// Vue 后续增加属性的例子
let i = 0
setInterval(() => {
  i++
  // app.text += 1
  // 无效
  // app.$options.data.text += 1
  // 有效,等同于 app.text += 1
  // app.$data.text += 1

  // forceupdate 的例子(不推荐使用)
  // 不使用 forceupdate 时不能修改 obj.a
  // app.obj.a = i
  // 使用 forceupdate 后可以重新渲染组件
  // app.$forceUpdate()

  // 若一个Vue属性刚开始没有赋值，后续需要增加这个值，推荐使用这种方式，替代 forceupdate
  app.$set(app.obj, 'a', i)
  // 删除某个对象
  // app.$delete(app.obj, 'a')
}, 1000)

// ============================ Vue 实例属性 ============================
// console.log(app.$data);
// console.log(app.$props);
// html 节点的引用
// console.log(app.$el);
// console.log(app.$options);

// 页面有值，在下一次渲染时会发生变化
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)

// 组件相关(<div></div>) <item><div></div></item>
// console.log(app.$children)
// 插槽， template 中使用
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// 配合 ref 用于快速定位到组件或html节点
// console.log(app.$refs)
// 服务端渲染时，用于判断环境
// console.log(app.$isServer)

// ============================ Vue 实例方法 ============================
// app.$watch('text', (newText, oldText) => {
//   console.log(`newText: ${newText}, oldText: ${oldText}`)
// })

// 注销$watch, app.$watch 写的需要手动去注销，否则会造成内存溢出,Vue 对象属性上写的 watch 不需要
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`newText: ${newText}, oldText: ${oldText}`)
// })

// setTimeout(() => {
//   unWatch()
// }, 3000)

// 事件监听
// app.$on('text', (a, b) => {
//   console.log(`test emmited ${a} ${b}`)
// })

// app.$emit('text')
// 触发事件
// app.$emit('text', 1, 2)

// 只会监听一次
// app.$once('text', (a, b) => {
//   console.log(`test emmited ${a} ${b}`)
// })

// setInterval(() => {
//   app.$emit('text', 1, 2)
// })

// 强制组件重新渲染一次
// app.$forceUpdate()


// app.$nextTick
