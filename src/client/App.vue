<template>
  <div :id="$style.app">
    <Header />
    <!-- <p>state count: {{ count }}</p> -->
    <p>state count: {{ counter }}</p>
    <p>getters fullName: {{ fullName }}</p>
    <!-- <router-link to="/app/123"> -->
    <router-link to="/app">
      <!-- 使用路由名称跳转 -->
      <!-- <router-link :to="{name: 'app'}"> -->
      app
    </router-link>
    <router-link to="/login">
      login
    </router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex';
import Header from './views/layout/Header.vue';
import Footer from './views/layout/Footer.vue';
import { setInterval } from 'timers';

// 测试自定义块
// console.log(Header.__docs)
export default {
  components: {
    Header,
    Footer
  },
  computed: {
    // 简便用法
    // ...mapState(['count']),
    // 修改 state 别名
    // ...mapState({
    //   counter: 'count'
    // }),
    // 别名加计算
    ...mapState({
      counter: (state) => state.count
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count;
    // },
    // fullName () {
    //   return this.$store.getters.fullName;
    // }
  },
  mounted () {
    console.log(this.$route);
    console.log(this.$store);
    // 外部直接修改 state,这样写是不允许的，有了 store.js 中 strict 模式就不能这样书写
    // 修改数据应该放在 mutations 中
    // this.$store.state.count = 200;

    // mutations 同步操作 state
    // let i = 1;
    // setInterval(() => {
    //   // 调用 mutation 的方法
    //   // this.$store.commit('updateCount', i++)
    //   // mutations 传递多个参数的用法，使用 payload
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 22,
    //     num3: 33,
    //     num4: 44
    //   })
    // }, 1000);

    // mutatison 的简写 配合 methods 中 ...mapMutations(['updateCount']) 的使用
    // let i = 1;
    // setInterval(() => {
    //   this.updateCount({
    //       num: i++,
    //       num2: 22,
    //       num3: 33,
    //       num4: 44
    //     })
    // }, 1000);

    // actions 异步操作 state
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // });
    // actions 的简写，配合 methods 中 ...mapActions(['updateCountAsync']) 的使用
    this.updateCountAsync({
      num: 5,
      time: 2000
    });
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  },
};
</script>

<style lang="scss" module>
#app{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url('./assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #4d4d4d;
  font-weight: 300;
}

#cover{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: .9;
  z-index: -1;
}
</style>
