import Vue from 'vue'

const app = new Vue({
  el: '#root',
  data: {
    isActived: true,
    arr: [1,2,3],
    html: '<span>111</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      // Vue 会自动添加浏览器前缀
      // appearance 会消除浏览器默认样式
      appearance: 'none'
    },
    styles2: {
      fontSize: '40px'
    }
  },
  computed : {
    // 动态绑定 class 方式四
    classNames () {
      return [
        'default',
        {active: this.isActived}
      ]
    }
  },
  methods: {
    handleClick () {
      alert(111)
    }
  },
  // template: `
  //   <div @click="handleClick">
  //     {{isActived ? 'actived': 'not actived'}}
  //     {{Date.now()}}
  //     {{arr.join(' ')}}
  //     <p v-html="html" :id="aaa"></p>
  //   </div>
  // `
  // class 动态绑定方式一
  // template: `
  //   <div :class="{active: isActived}">
  //     {{Date.now()}}
  //   </div>
  // `
  // class 动态绑定方式二
  // template: `
  //   <div :class="[isActived ? 'active': '']">
  //     {{Date.now()}}
  //   </div>
  // `
  // class 动态绑定方式三
  // template: `
  //   <div :class="['default-class', {active:isActived}]">
  //     {{Date.now()}}
  //   </div>
  // `
  // class 动态绑定方式四，配合 computed
  // template: `
  //   <div :class="classNames">
  //     {{Date.now()}}
  //   </div>
  // `
  // style 动态绑定
  // template: `
  //   <div :style="styles">
  //     {{Date.now()}}
  //   </div>
  // `
  template: `
    <div :class="classNames" :style="[styles, styles2]">
      {{Date.now()}}
    </div>
  `
})
