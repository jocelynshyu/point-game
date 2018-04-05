if (location.protocol === 'https:') {
  location.href = location.href.replace(/^https:/, 'http:');
}

const API_DOMAIN = 'http://ladder.puffsnow.cc';

const getRules = (gap) => {
  if (gap <= -5000) return [50, -40];
  if (gap <= -400) return [45, -36];
  if (gap <= -300) return [40, -32];
  if (gap <= -200) return [35, -28];
  if (gap <= -150) return [30, -24];
  if (gap <= -100) return [20, -16];
  if (gap <= -50) return [13, -10];
  if (gap <= 25) return [8, -7];
  if (gap <= 50) return [7, -6];
  if (gap <= 100) return [6, -5];
  if (gap <= 150) return [5, -4];
  if (gap <= 200) return [4, -3];
  if (gap <= 300) return [3, -2];
  if (gap <= 400) return [2, -1];
  return [1, 0];
};



//    dP""b8 888888 88b 88 888888 88""Yb    db    88
//   dP   `" 88__   88Yb88 88__   88__dP   dPYb   88
//   Yb  "88 88""   88 Y88 88""   88"Yb   dP__Yb  88  .o
//    YboodP 888888 88  Y8 888888 88  Yb dP""""Yb 88ood8

const Topbar = {
  template: `
    <div class="topbar">
      <router-link :to="{ name: 'home' }">
        <img class="icon topbar__logo" src="images/favicon.png" alt="尋云羽球積分網" />
      </router-link>
      <h1 class="topbar__title">翻<span class="gray">尋</span>云覆羽<span class="gray">球積分網</span></h1>
    </div>
  `,
};

const Main = {
  template: `
    <div class="container">
      <Topbar />
      <router-view></router-view>
    </div>
  `,
  components: { Topbar },
};

const Player = {
  template: `
    <div class="player" @click="onPlayerClick">
      <img v-if="!player.id" class="icon" alt="" src="images/user-add.png" />
      <template v-else>
        <img
          v-if="player && !avatarError"
          class="player__avatar"
          :src="avatar"
          :alt="player.name"
          @error="onAvatarError"
        />
        <img v-else="avatarError" class="player__avatar tiny" alt="" src="images/ghost.png" />
        <p class="player__info">{{player.name}}<br /> ({{player.point}})</p>
      </template>
    </div>
  `,
  props: ['player', 'onClick'],
  data() {
    return { avatarError: false };
  },
  computed: {
    avatar() {
      return `https://graph.facebook.com/${this.player.fb_id}/picture?type=large`;
    },
  },
  methods: {
    onAvatarError() { this.avatarError = true; },
    onPlayerClick () {
      const { player, onClick } = this;
      if (onClick) onClick(player);
    },
  },
};



//   88""Yb    db    888888 888888 88     888888
//   88__dP   dPYb     88     88   88     88__
//   88""Yb  dP__Yb    88     88   88  .o 88""
//   88oodP dP""""Yb   88     88   88ood8 888888

const BattleTeam = {
  template: `
    <div class="team">
      <div class="team-members">
        <Player
          v-for="player in team.members"
          :key="player.id"
          :player="player"
          v-bind="{ onClick: onClick.bind(null, player) }"
        />
      </div>
      <p class="point-container">
        平均積分<span class="point">{{team.averagePoints}}</span>
      </p>
    </div>
  `,
  components: { Player },
  props: ['team', 'onClick'],
};

const BattleResult = {
  template: `
    <div>
      <p class="slogan">{{result.title}}</p>
      <p>獲勝得到 {{result.winPoints}} 分</p>
      <p>失敗扣除 {{result.losePoints}} 分</p>
    </div>
  `,
  props: ['result'],
};

const BattleSelector = {
  template: `
    <div class="selector">
      <div class="selector__header">
        <input class="selector__input" v-model="search" placeholder="輸入名字來搜尋吧！" />
        <span class="selector__button" @click="onClose">關閉</span>
      </div>
      <div class="selector__main">
        <div class="player-list">
          <Player
            v-for="player in playersRemain"
            :key="player.id"
            :player="player"
            v-bind="{ onClick: onChoose.bind(null, player) }"
          />
        </div>
      </div>
    </div>
  `,
  components: { Player },
  props: ['players', 'onChoose', 'onClose'],
  data() { return { search: '' }; },
  computed: {
    playersRemain() {
      const { players, search } = this;
      const pattern = new RegExp(search.toLowerCase());
      return players.filter(({ name }) => pattern.test(name.toLowerCase()));
    },
  },
};

const PageBattle = {
  template: `
    <div class="battle">
      <main class="main">
        <BattleTeam :team="teamA" v-bind="{ onClick: onPosClick }" />
        <BattleTeam :team="teamB" v-bind="{ onClick: onPosClick }" />
        <BattleResult :result="resultA" />
        <BattleResult :result="resultB" />
      </main>

      <BattleSelector
        v-bind:class="{ active: choosingPos }"
        :players="playersRemain"
        v-bind="{ onChoose: onPlayerChoose, onClose: onSelectorClose }"
      />
    </div>
  `,

  components: { BattleTeam, BattleResult, BattleSelector },

  data() {
    return {
      players: [],
      a1: null,
      a2: null,
      b1: null,
      b2: null,
      choosingPos: null,
    };
  },

  computed: {
    teamA() { return this.getTeamInfo('a', this.a1, this.a2); },
    teamB() { return this.getTeamInfo('b', this.b1, this.b2); },

    averagePoints() { return (this.teamA.averagePoints + this.teamB.averagePoints) / 2; },

    resultA() { return this.getResultInfo(this.teamA.averagePoints); },
    resultB() { return this.getResultInfo(this.teamB.averagePoints); },

    playersRemain() {
      const { a1, a2, b1, b2, search } = this;
      const chosenPlayers = [a1, a2, b1, b2].filter(p => p);
      return this.players.filter(({ id }) => chosenPlayers.indexOf(id) === -1);
    },
  },

  methods: {
    getPlayerInfo(playerId) {
      if (!playerId) return {};
      const player = this.players.filter(({ id }) => id === playerId)[0];
      return player || {};
    },

    getAveragePoints(players) {
      const choosenPlayers = players.filter(({ id }) => id);
      const amount = choosenPlayers.length;
      if (!amount) return 0;
      const sum = choosenPlayers.reduce((sum, { point }) => sum + point, 0);
      return sum / amount;
    },

    getTeamInfo(team, id1, id2) {
      const members = [id1, id2].map(this.getPlayerInfo);

      return {
        members: members.map((m, idx) => ({ ...m, pos: `${team}${idx + 1}` })),
        averagePoints: this.getAveragePoints(members),
      };
    },

    getTitle(points) {
      const { averagePoints } = this;
      if (points === averagePoints) return '！勢均力敵！';
      if (points > averagePoints) return '預期的溫拿';
      return '預期的魯蛇';
    },

    getResultInfo(points) {
      const { averagePoints } = this;
      const gap = (points - averagePoints) * 2;
      const [winPoints] = getRules(gap);
      const [_, losePoints] = getRules(gap * -1);
      const title = this.getTitle(points);
      return { title, winPoints, losePoints: losePoints * -1 };
    },

    onPosClick({ pos }) { this.choosingPos = pos; },
    onSelectorClose() {
      setTimeout(() => {
        this.choosingPos = null;
      }, 200);
    },

    onPlayerChoose({ id }) {
      this[this.choosingPos] = id;
      this.onSelectorClose();
    },
  },

  mounted() {
    axios.get(`${API_DOMAIN}/members/all`)
      .then(({ data: { members } }) => { this.players = members });
  },
};



//   88  88  dP"Yb  8b    d8 888888
//   88  88 dP   Yb 88b  d88 88__
//   888888 Yb   dP 88YbdP88 88""
//   88  88  YbodP  88 YY 88 888888

const PageHome = {
  template: `
    <div class="home">
      <router-link class="home-link blue" :to="{ name: 'rank' }">
        <img class="icon" src="images/rank.png" alt="英雄榜" />
      </router-link>
      <router-link class="home-link red" :to="{ name: 'battle' }">
        <img class="icon" src="images/fire.png" alt="對決吧！" />
      </router-link>
    </div>
  `,
};



//   88""Yb    db    88b 88 88  dP 
//   88__dP   dPYb   88Yb88 88odP  
//   88"Yb   dP__Yb  88 Y88 88"Yb  
//   88  Yb dP""""Yb 88  Y8 88  Yb 

const PageRank = {
  template: `
    <div class="rank">
      <template v-for="list in [top3, passerby]" :key="list.title">
        <h2>{{list.title}}</h2>
        <div class="player-list">
          <router-link
            v-for="player in list.players"
            class="player-link"
            :key="player.id"
            :to="{ name: 'player', params: { id: player.id } }"
          >
            <Player :player="player" />
          </router-link>
        </div>
      </template>
    </div>
  `,
  components: { Player },
  data() { return { players: [] }; },

  computed: {
    top3() {
      return {
        title: 'Catch Me if You Can',
        players: this.players.filter((p, idx) => idx < 3),
      };
    },
    passerby() {
      return {
        title: '回家多練練吧！',
        players: this.players.filter((p, idx) => idx >= 3),
      };
    },
  },

  mounted() {
    axios.get(`${API_DOMAIN}/members/all`)
      .then(({ data: { members } }) => { this.players = members; });
  },
};



const PagePlayer = {
  template: `
    <div class="personal">
      <img class="icon" alt="" src="images/rocket-fly.png" />
      <span style="margin-top: 20px">努力中請稍候~</span>
    </div>
  `,
}



//   88""Yb    db    .dP"Y8 88  dP""b8
//   88__dP   dPYb   `Ybo." 88 dP   `"
//   88""Yb  dP__Yb  o.`Y8b 88 Yb
//   88oodP dP""""Yb 8bodP' 88  YboodP

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '', component: PageHome, name: 'home' },
      { path: 'rank', component: PageRank, name: 'rank' },
      { path: 'battle', component: PageBattle, name: 'battle' },
      { path: 'player/:id', component: PagePlayer, name: 'player' },
    ],
  },
];
const router = new VueRouter({ routes });

Vue.use(VueRouter);
new Vue({ el: '#app', router });
