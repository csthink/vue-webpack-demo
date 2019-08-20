import Vue from 'vue'

const data = {
  text: 123
}

const component = {
  // 不严谨，没限制类型
  // props: [active, propOne],
  // props: {
  //   active: Boolean,
  //   propOne: String,
  //   // onChange: Function
  // },
  props: {
    active: {
      // type: Boolean,
      // required: tru e,
      defalut: true,
      // 若是对象，则需要用方法来定义
      // default: () {
      //   return {}
      // }
      // 自定义验证 props
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String,
    // onChange: Function
  },
  methods: {
    handleChange () {
      // this.onChange()
      // 推荐使用
      this.$emit('change')
    }
  },
  template: `
    <div>
      <p>Text: {{text}}</p>
      <input type="text" v-model.number="text"/>
      <span v-show="active">see me if active</span>
      <span @click="handleChange">click event: {{propOne}}</span>
    </div>
  `,
  data() {
    // 这样写有问题
    // return data
    return {
      text: 123
    }
  }
}

// 全局注册
// Vue.component('CompOne', component)

const app = new Vue({
  el: '#root',
  components: {
    'comp-one': component
  },
  data: {
    prop1: '0',
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    }
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" @change="handleChange"></comp-one>
      <comp-one :active="false" prop-one="prop2"></comp-one>
    </div>
  `
})
