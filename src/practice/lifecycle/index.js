import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  data: {
    text: 0
  },
  beforeCreate () {
    // beforeCreate 无法操作 $el
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    // create 无法操作 $el
    console.log(this.$el, 'created')
  },
  beforeMount () {
    // beforeMount 可以操作 $el
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    // mounted 可以操作 $el, mounted 后不会去操作 $el
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated() {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  // template: '<div>{{text}}</div>',
  // template 会被编译到 render 方法中去执行，等同于直接写 template
  render (h) {
    console.log('render function invoked')
    return h('div', {}, this.text)
    // throw new TypeError('render error')
  },
  // 本组件的错误才能被捕获,正式环境不能使用
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  // root 组件上设置后，会向上冒泡,可以捕获所有组件的错误，正式环境可以使用
  errorCaptured () {

  }
})

app.$mount('#root')

// beforeUpdate 和 updated 有数据更新时会执行
// setInterval(() => {
//   app.text += 1
// }, 1000)

// beforeDestory 和 destroyed
// setTimeout(() => {
//   app.$destroy()
// }, 2000)
