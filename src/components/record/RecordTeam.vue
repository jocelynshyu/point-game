<template>
  <div class="team">
    <router-link
      v-for="player in team"
      :key="player.id"
      class="link"
      :class="{ cyan: me === player.id }"
      :to="{ name: 'player', params: { id: player.id } }"
    >{{player.name}}</router-link>
  </div>
</template>

<script>
export default {
  props: ['team', 'me'],
};
</script>

<style lang="scss" scoped>
.link {
  display: block;
  padding: 5px 10px;
  transition: background 0.3s;

  &:hover { background: #555; }
}

.cyan {
  color: #00bcd4;
}
</style>
