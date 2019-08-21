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

// store.unregisterModule('c')
// 监听 store 的 state
// 参数1 是监听一个想要得到的返回值
// 参数2 是前一个返回值有变化的时候回调的函数
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count wateched: ' + newCount)
// });

// 监听 store 的 mutation
// store.subscribe((mutation, state) => {
//   console.log(mutation.type); // mutation 的名称
//   console.log(mutation.payload); // 传递给 mutation 的所有参数
// });

// 监听 store 的 action
// store.subscribeAction((action, state) => {
//   console.log(action.type);
//   console.log(action.payload);
// });

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log('beforeEach invoked');
  next();
  // if (to.fullPath === '/app') {
  //   next({path: '/login', replace: true})
  // } else {
  //   next()
  // }
});

router.beforeResolve((to, from, next) => {
  // console.log('beforeResolve invoked');
  next();
});

router.afterEach((to, from) => {
  // console.log('afterEach invoked');
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root');
