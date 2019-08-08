import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import './assets/style/global.scss'

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#root');
