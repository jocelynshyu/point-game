import Vue from 'vue';
import VueRouter from 'vue-router';
import smoothscroll from 'smoothscroll';
import Main from './Main.vue';
import Rank from './pages/Rank.vue';
import Player from './pages/Player.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '', component: Rank, name: 'home' },
      { path: 'player/:id', component: Player, name: 'player' },
    ],
  },
  { path: '*', redirect: '/' },
];
const router = new VueRouter({ routes });

router.afterEach(() => {
  setTimeout(() => {
    smoothscroll(0);
  }, 300);
});

export default router;
