import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/login', name: 'login', component: LogIn },
  ]
})