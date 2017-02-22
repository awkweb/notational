import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LogIn from '../views/LogIn.vue'

export default new Router({
  routes: [
    { path: '/', name: 'login', component: LogIn },
  ]
})