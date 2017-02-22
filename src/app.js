require('./scss/styles.scss');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})