<template>
  <main>
    <section v-for="list in [top3, passerby]" :key="list.title">
      <h2>{{list.title}}</h2>
      <PlayerList
        :players="list.players"
        :onClick="toPlayerPage"
      />
    </section>
  </main>
</template>

<script>
import { getAll } from '../functions/getData';
import PlayerList from '../components/PlayerList.vue';

export default {
  components: { PlayerList },

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

  methods: {
    toPlayerPage({ id }) {
      this.$router.push({ name: 'player', params: { id }})
    },

    updatePlayers(members) {
      if (members && members.length) this.players = members;
    }
  },

  mounted() {
    if (window.localStorage) {
      const members = JSON.parse(localStorage.getItem('members'));
      this.updatePlayers(members);
    }

    getAll().then((members) => this.updatePlayers(members));
  },
};
</script>

<style lang="scss" scoped>
section {
  & + & { margin-top: 50px; }
}
</style>
