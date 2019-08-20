import Vue from 'vue'

const ChildComponent = {
  template: `<div>child componet: {{data.age}}</div>`,
  // inject: ['yeye', 'value'],
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.yeye, this.value)
  }
}

const componet = {
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //   </div>
  // `,
  // 注意 name 关键字
  // template: `
  //   <div :style="style">
  //     <slot fullName="Jack Jones" :age="age"></slot>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot fullName="Jack Jones" :age="age"></slot>
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      age: 20
    }
  },
  components: {
    ChildComponent
  }
}

new Vue({
  el: '#root',
  // 配合 inject 使用，父级提供，子级使用，必须具备父子关系或祖孙关系
  provide () {
    // provide 提供的数据，默认不支持 reactive,这里手动支持
    const data = {}

    Object.defineProperty(data, 'age', {
      get: () => this.age,
      enumerable: true
    })

    return {
      yeye: this,
      // value: this.age
      data
    }
  },
  components: {
    CompOne: componet
  },
  data () {
    return {
      age: 18
    }
  },
  mounted () {
    // console.log(this.$refs.comp, this.$refs.span)
    // console.log(this.$refs.comp.age)
  },
  // template: `
  //   <div>
  //     <comp-one>
  //       <span>this is content</span>
  //     </comp-one>
  //   </div>
  // `
  // template: `
  //   <div>
  //     <comp-one>
  //       <span slot="header">this is header</span>
  //       <span slot="body">this is body</span>
  //     </comp-one>
  //   </div>
  // `
  // template: `
  //   <div>
  //     <comp-one>
  //       <span>{{age}}</span>
  //     </comp-one>
  //   </div>
  // `
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span slot-scope="props" ref="span">{{props.fullName}} {{props.age}} {{age}}</span>
  //     </comp-one>
  //   </div>
  // `
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span">{{props.fullName}} {{props.age}} {{age}}</span>
      </comp-one>
      <input type="text" v-model="age"/>
    </div>
  `
})
