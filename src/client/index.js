import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import './assets/style/global.scss'

Vue.use(BootstrapVue)

import './assets/style/test.scss'

// consoe.log(11)

new Vue({
  render: h => h(App)
}).$mount('#root');
