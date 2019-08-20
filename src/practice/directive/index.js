import Vue from 'vue'

const app = new Vue({
  el: '#root',
  data: {
    msg: 'test',
    id: 'aaa',
    id2: 'bbb',
    html: '<span>1122</span>',
    actived: false,
    num: 0,
    lists: [
      {id:1, name:'jack'},
      {id:2, name:'rose'},
      {id:3, name:'meimei'},
    ],
    lists2: {
      a: 123,
      b: 456,
      c: 789
    },
    number: 1,
    info: '',
    text: '',
    arr: [1, 2, 3],
    sex: ''
  },
  template: `
    <div>
      <div v-bind:id='id'>{{msg}}</div>
      <div :id='id2'>{{msg}}</div>
      <div v-text="msg"></div>
      <div v-pre>{{msg}}</div>
      <div v-once>msg: {{msg}}</div>
      <input type="text" v-model="msg"/>
      <div v-html="html"></div>
      <div v-show="actived">推荐使用 v-show</div>
      <div v-if="actived">v-show 直接把节点从 Dom 中移除了，性能差于 v-if</div>
      <div v-else>v-else 内容</div>
      <div v-if="num > 0">num 大于 0: {{num}}</div>
      <div v-else-if="num === 0">num 等于 0: {{num}}</div>
      <div v-else>num 小于 0: {{num}}</div>
      <ul>
        <li v-for="(item, index) in lists" :key="item.id">id: {{item.id}}, name: {{item.name}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, index) in lists2" :key="index">val: {{val}} ,key: {{key}}, index: {{index}}</li>
      </ul>

      <p>number: {{number}}</p>
      <input type="text" v-model.number="number" />

      <p>info: {{info}}</p>
      <input type="text" v-model.trim="info" />

      <p>text: {{text}}</p>
      <input type="text" v-model.lazy="text" />

      <input type="checkbox" v-model="actived"/>

      <div>
        <input type="checkbox" :value="1" v-model="arr"/>
        <input type="checkbox" :value="2" v-model="arr"/>
        <input type="checkbox" :value="3" v-model="arr"/>
      </div>

      <div>
        <p>sex: {{sex}}</p>
        <input type="radio" value="male" v-model="sex"/>
        <input type="radio" value="female" v-model="sex"/>
      </div>
    </div>
  `
})
