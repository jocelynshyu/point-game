<template>
  <div class="list">
    <Player
      v-for="player in players"
      :key="player.id"
      :player="player"
      :onClick="onClick"
    />
  </div>
</template>

<script>
import Player from '../components/Player.vue';

export default {
  components: { Player },
  props: ['players', 'onClick'],
};
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  @media (min-width: 500px) { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 600px) { grid-template-columns: repeat(5, 1fr); }
}
</style>
