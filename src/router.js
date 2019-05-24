import Vue from 'vue'
import Router from 'vue-router'
import smoothscroll from 'smoothscroll'
import Rank from './pages/Rank.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Rank
  },
  {
    path: '/player/:id',
    name: 'player',
    component: () => import('./pages/Player.vue')
  },
  {
    path: '*',
    redirect: '/'
  },
];
const router = new Router({ routes });

router.afterEach(() => {
  setTimeout(() => {
    smoothscroll(0);
  }, 300);
});

export default router;
