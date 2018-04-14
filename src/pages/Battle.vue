<template>
  <div class="wrapper">
    <main>
      <Team :team="teamA" :onClick="onPosClick" />
      <Team :team="teamB" :onClick="onPosClick" />
      <Result :result="resultA" />
      <Result :result="resultB" />
    </main>
    <Selector
      :players="playersRemain"
      :class="{ active: choosingPos }"
      :onChoose="onPlayerChoose"
      :onClose="onSelectorClose"
    />
  </div>
</template>

<script>
import getResult from '../functions/getResult';
import { getAll } from '../functions/getData';
import Team from '../components/battle/Team.vue';
import Result from '../components/battle/Result.vue';
import Selector from '../components/battle/Selector.vue';

export default {
  components: { Team, Result, Selector },

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
    updatePlayers(members) {
      if (members && members.length) this.players = members;
    },

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
        members: members.map((data, idx) => {
          data.pos = `${team}${idx + 1}`;
          return data;
        }),
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
      const [winPoints] = getResult(gap);
      const [_, losePoints] = getResult(gap * -1);
      const title = this.getTitle(points);
      return { title, winPoints, losePoints: losePoints * -1 };
    },

    onPosClick({ pos }) {
      this.choosingPos = pos;
    },
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
    if (window.localStorage) {
      const members = JSON.parse(localStorage.getItem('members'));
      this.updatePlayers(members);
    }

    getAll().then((members) => this.updatePlayers(members));
  },

  watch: {
    choosingPos(to) {
      const overflowSetting = to ? 'hidden' : 'initial';
      document.querySelector('body').style.overflow = overflowSetting;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  min-width: 320px;
  background: linear-gradient(to right, #214fb0 50%, #dd4745 50%);
}

main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  flex-grow: 0;
}
</style>
