import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String,
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  },
  mounted() {
    console.log('comp mounted')
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
    return {
      text: 0
    }
  }
}

const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted() {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name)
    // 不推荐使用
    this.$parent.text = 'agege'
  },
}

const parent = new Vue({
  name: 'Parent'
})

new Vue({
  el: '#root',
  name: 'Root',
  parent: parent,
  components: {
    Comp: component2
  },
  data () {
    return {
      text: '2233234'
    }
  },
  mounted () {
    console.log(this.$parent.$options.name)
  },
  template: `
    <div>
      text: {{text}}
      <comp></comp>
    </div>
  `
})

const CompOne = Vue.extend(component)

// new CompOne({
//   el: '#root',
//   propsData: {
//     propOne: 'xx'
//   },
//   data: {
//     text: 23
//   },
//   mounted() {
//     console.log('instance mounted')
//   },
// })
