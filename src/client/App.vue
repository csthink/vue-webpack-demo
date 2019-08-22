<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './views/layout/Header.vue';
import Footer from './views/layout/Footer.vue';

export default {
  components: {
    Header,
    Footer
  },
};
</script>

<style lang="stylus" scoped>
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
</style>
