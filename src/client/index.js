import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import './assets/style/global.scss';
import createRouter from './config/router';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);

const router = createRouter();

new Vue({
  router,
  render: h => h(App)
}).$mount('#root');
