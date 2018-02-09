import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import LogIn from '@/pages/auth/LogIn';
import SignUp from '@/pages/auth/SignUp';
import NV from '@/pages/app/NV';
import Public from '@/pages/app/Public';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/app', name: 'app', component: NV, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LogIn },
    { path: '/signup', name: 'signup', component: SignUp },
    { path: '/n/:id', name: 'public', component: Public },
    { path: '*', name: 'notfound', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } });
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (user && to.name !== 'public') {
      next({ name: 'app' });
    } else {
      next();
    }
  }
});

export default router;
