<template>
  <div class="player" @click="onPlayerClick">
    <img v-if="!player.id" class="icon" alt="" src="static/images/user-add.png" />
    <template v-else>
      <Avatar :player="player" />
      <p class="info">{{player.name}}<br /> ({{player.point}})</p>
    </template>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  components: { Avatar },

  props: ['player', 'onClick'],

  methods: {
    onPlayerClick () {
      const { player, onClick } = this;
      if (onClick) onClick(player);
    },
  },
};
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85em;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20%;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.6;
  }
}

.info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 20px 0 5px;
  line-height: 1.5;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.icon {
  opacity: 0.8;
  transform: scale(1.2);
  transition: transform 0.3s;
}

@media (min-width: 750px) {
  br { display: none; }
  p { padding: 20px 0 10px; }
}
</style>
