<template>
  <img
    v-if="avatar"
    :src="avatar"
    :alt="player.name"
    @error="onAvatarError"
  />
  <img
    v-else
    src="../assets/avatar.jpg"
    :alt="player.name"
  />
</template>

<script>
export default {
  props: ['player'],

  data() {
    return { error: false };
  },

  computed: {
    avatar() {
      const { player, error } = this;
      if (error || !player || !player.fb_id) return;
      return `https://graph.facebook.com/${player.fb_id}/picture?type=large`;
    },
  },

  methods: {
    onAvatarError() { this.error = true; },
  },
};
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
}
</style>
