import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './Main.vue';
import Home from './pages/Home.vue';
import Rank from './pages/Rank.vue';
import Battle from './pages/Battle.vue';
import Player from './pages/Player.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'rank', component: Rank, name: 'rank' },
      { path: 'battle', component: Battle, name: 'battle' },
      { path: 'player/:id', component: Player, name: 'player' },
    ],
  },
  { path: '*', redirect: '/' },
];
const router = new VueRouter({ routes });

export default router;
