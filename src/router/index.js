import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import ls from 'local-storage'

import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueHead)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/app', name: 'app', component: Main, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const user = ls.get('user')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  } else {
    if (user) {
      next({ name: 'app' })
    } else {
      next()
    }
  }
})

export default router
