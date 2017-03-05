require('./scss/styles.scss');

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'


Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

const app = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
})