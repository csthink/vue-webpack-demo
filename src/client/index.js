import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';

import './assets/style/global.scss';
import createRouter from './config/router';
import createStore from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);

const router = createRouter();
const store = createStore();

// vuex 动态添加模块
store.registerModule('c', {
  state: {
    text: 'dynamic module from c module'
  }
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked');
  next();
  // if (to.fullPath === '/app') {
  //   next({path: '/login', replace: true})
  // } else {
  //   next()
  // }
});

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked');
  next();
});

router.afterEach((to, from) => {
  console.log('afterEach invoked');
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root');
