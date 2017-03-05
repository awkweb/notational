import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'

import store from '../store'
import Main from '../views/Main.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueHead)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'main', component: Main, meta: { requiresAuth: true} },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.user) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
