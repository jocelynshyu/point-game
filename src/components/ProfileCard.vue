<template>
  <div class="card">
    <div class="avatar">
      <Avatar :player="player" />
    </div>

    <div class="info">
      <h3 class="name">{{player.name}}</h3>
      <p class="line">目前積分 <span class="point">{{player.point}}</span></p>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  components: { Avatar },
  props: ['player'],
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 375px;
  margin: 20px auto 40px;
  padding: 15px;
  color: #555;
  background: #fff;
  border-radius: 10px;

  @media (min-width: 400px) {
    flex-direction: row;
    padding: 15px;
  }
}

.avatar {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  margin: 0 0 10px;
  border-radius: inherit;
  overflow: hidden;
  will-change: transform;

  @media (min-width: 400px) {
    margin: 0 15px 0 0;
  }

  @media (min-width: 450px) {
    width: 150px;
    height: 150px;
  }
}

.info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.name {
  margin: 10px 0;
  font-size: 2em;
}

.line {
  margin: 0;
}

.point {
  display: inline;
  padding: 0;
  font-size: 1.6em;
}
</style>
