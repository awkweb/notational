require('./scss/styles.scss');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import * as directives from './directives'


Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
Object.keys(directives).forEach(key => { Vue.directive(key, directives[key]) })

const app = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})