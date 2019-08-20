import Vue from 'vue'

const app = new Vue({
  el: '#root',
  data: {
    firstName: 'Mingyang',
    lastName: 'Du',
    number: 0,
    fullName: '',
    obj: {
      a: '112'
    }
  },
  computed: {
    // 不要在这里修改任何监听到的属性的值
    name () {
      // 有缓存，性能好
      console.log('new name')
      return this.firstName + ' ' + this.lastName
    }

    // name: {
    //   get () {
    //     return this.firstName + ' ' + this.lastName
    //   },
    // set 方法不推荐使用
    //   set (name) {
    //     const names = name.split('')
    //     this.firstName = names[0]
    //     this.lastName = names[1]
    //   }
    // }
  },
  watch: {
    // 不要在这里修改任何监听到的属性的值
    // 监听到某个数据的变化，需要向后台发送时，就可以使用 watch
    // watch方法默认只有在内容发生改变时才回去执行
    // firstName (newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName
    // }
    // 这样的 watch 方法就会立刻执行
    // firstName: {
    //   handler (newName, oldName) {
    //     this.fullName = newName + ' ' + this.lastName
    //   },
    //   immediate: true
    // }
    // obj: {
    //   handler () {
    //     console.log('obj a changed')
    //   },
    //   immediate: true,
    //   // deep: true
    // },
    'obj.a': {
      handler () {
        console.log('obj a changed')
      },
      immediate: true,
      // deep: true
    }

  },
  mounted () {
    this.obj = {
      a: '344'
    }
  },
  methods: {
    getName () {
      // dom 重新渲染就会被重新调用
      console.log('getName invoked')
      return this.firstName + ' ' + this.lastName
    }
  },
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>fullName: {{fullName}}</p>
      <p>Number: {{number}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
    </div>
  `
})
