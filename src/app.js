require('./scss/styles.scss');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as directives from './directives'
import * as filters from './filters'


Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })

const app = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})