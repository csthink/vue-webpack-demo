import Vue from 'vue'

const componet = {
  props: ['prop1'],
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement('div', {
      style: this.style,
      // nativeOn 就不需要这里触发
      // on: {
      //   click: () => {this.$emit('click')}
      // }
    }, [
      // this.$slots.default,
      this.$slots.header,
      this.prop1
    ])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      age: 20
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: componet
  },
  data () {
    return {
      age: 18
    }
  },
  mounted () {
    console.log(this.$refs.comp, this.$refs.span)
  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{age}}</span>
  //     </comp-one>
  //   </div>
  // `,
  render () {
    return this.$createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          prop1: this.age
        },
        // on: {
        //   click: this.handleClick
        // },
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        this.$createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            domProps: {
              // 会覆盖掉 this.age 内容
              innerHTML: '<span>hello</span>'
            },
            attrs: {
              id: 'xx'
            }
          },
          this.age
        )
      ]
    )
  }
})
