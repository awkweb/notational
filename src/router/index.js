import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import ls from 'local-storage'

import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueHead)
Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/app', name: 'app', component: Main },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'app' && ls.get('user')) {
    next({
      path: '/app'
    });
  } else {
    next();
  }
})

export default router
