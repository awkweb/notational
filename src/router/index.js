import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import ls from 'local-storage'

import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueHead)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
  ]
})

export default router
