<template>
  <div :id="$style.app">
    <Header />
    <p>{{ count }}</p>
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
    count () {
      return this.$store.state.count;
    }
  },
  mounted () {
    console.log(this.$route);
    console.log(this.$store);
    let i = 1;
    setInterval(() => {
      // 调用 mutation 的方法
      this.$store.commit('updateCount', i++)
    }, 1000)
  }
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
