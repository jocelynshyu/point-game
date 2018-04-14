<template>
  <img
    v-if="player && !error"
    :src="avatar"
    :alt="alt"
    @error="onAvatarError"
  />
</template>

<script>
export default {
  props: ['player'],

  data() {
    return { error: false };
  },

  computed: {
    isPlayerExist() { return this.player && this.player.id; },

    alt() { return this.isPlayerExist ? this.player.name : ''; },

    avatar() {
      const { player, isPlayerExist, error } = this;
      if (error || !isPlayerExist || !player.fb_id) return 'static/images/avatar.jpg';
      return this.getFacebookAvatar(player.fb_id);
    },
  },

  methods: {
    onAvatarError() { this.error = true; },
    getFacebookAvatar(id) {
      return `https://graph.facebook.com/${id}/picture?type=large`;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
  transition: 0.3s;
  will-change: transform;
}
</style>
