<template>
  <div :id="$style.app">
    <Header />
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

// 测试自定义块
// console.log(Header.__docs)
export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    console.log(this.$route)
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
