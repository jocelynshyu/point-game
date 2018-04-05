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



// topbar
Vue.component('topbar', {
  template: `
    <div class="topbar">
      <img class="topbar__logo" src="images/favicon.png" alt="尋云羽球積分網" />
      <h1 class="topbar__title">翻<span class="gray">尋</span>云覆羽<span class="gray">球積分網</span></h1>
    </div>
  `,
});

// 球員大頭貼
Vue.component('player', {
  template: `
    <div class="player" @click="onClick(player)">
      <div class="player__icon" v-if="!player.id">+</div>
      <img
        v-if="player.id"
        class="player__avatar"
        :src="avatar"
        :alt="player.name"
        @error="onAvatarError"
      />
      <p v-if="player.id" class="player__info">{{player.name}}<br /> ({{player.point}})</p>
    </div>
  `,
  props: ['player', 'onClick'],
  data() {
    return { avatarError: false };
  },
  computed: {
    avatar() {
      if (!this.player.fb_id || this.avatarError) return 'images/avatar.jpg';
      return `https://graph.facebook.com/${this.player.fb_id}/picture?type=large`;
    },
  },
  methods: {
    onAvatarError() { this.avatarError = true; }
  },
});

// 隊伍基本資訊
Vue.component('team', {
  template: `
    <div class="team">
      <div class="team-members">
        <player
          v-for="player in team.members"
          :player="player"
          v-bind="{ onClick: onClick.bind(null, player) }"
        />
      </div>
      <p class="point-container">
        平均積分<span class="point">{{team.averagePoints}}</span>
      </p>
    </div>
  `,
  props: ['team', 'onClick'],
});

// 隊伍勝負資訊
Vue.component('result', {
  template: `
    <div>
      <p class="slogan">{{result.title}}</p>
      <p>獲勝得到 {{result.winPoints}} 分</p>
      <p>失敗扣除 {{result.losePoints}} 分</p>
    </div>
  `,
  props: ['result'],
});



// 選擇視窗
Vue.component('selector', {
  template: `
    <div class="selector">
      <div class="selector__header">
        <input class="selector__input" v-model="search" placeholder="輸入名字來搜尋吧！" />
        <span class="selector__button" @click="onClose">關閉</span>
      </div>
      <div class="selector__main">
        <div class="player-list">
          <player
            v-for="player in playersRemain"
            :player="player"
            v-bind="{ onClick: onChoose.bind(null, player) }"
          />
        </div>
      </div>
    </div>
  `,
  props: ['players', 'onChoose', 'onClose'],
  data() { return { search: '' }; },
  computed: {
    playersRemain() {
      const { players, search } = this;
      const pattern = new RegExp(search.toLowerCase());
      return players.filter(({ name }) => pattern.test(name.toLowerCase()));
    },
  },
});



new Vue({
  el: "#app",

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
    onSelectorClose() { this.choosingPos = null; },

    onPlayerChoose({ id }) {
      this[this.choosingPos] = id;
      this.onSelectorClose();
    },
  },

  mounted() {
    axios.get(`${API_DOMAIN}/members/all`)
      .then(({ data: { members } }) => { this.players = members });
  },
});
