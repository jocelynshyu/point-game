<template>
  <div class="team">
    <div class="members">
      <Player
        v-for="player in team.members"
        :key="player.id"
        :player="player"
        :onClick="onClick"
      />
    </div>
    <p class="line">
      平均積分<span class="point">{{team.averagePoints}}</span>
    </p>
  </div>
</template>

<script>
import Player from '../Player.vue';

export default {
  components: { Player },
  props: ['team', 'onClick'],
};
</script>

<style lang="scss" scoped>
.members {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  >>> .player {
    width: 120px;
    height: 120px;
    margin: 10px;
  }
}

.line {
  margin: 40px 0 0;
}

.point {
  display: block;
  padding: 20px 0 0;
  font-size: 12vw;

  @media (min-width: 600px) {
    font-size: 70px;
  }
}
</style>
