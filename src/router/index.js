import Vue from 'vue'
import VueHead from 'vue-head'
import Router from 'vue-router'

Vue.use(VueHead)
Vue.use(Router)

import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'

export default new Router({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
  ]
})