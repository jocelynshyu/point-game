<template>
  <div class="selector">
    <div class="header">
      <input class="input" v-model="search" placeholder="輸入名字來搜尋吧！" />
      <span class="button" @click="onClose">關閉</span>
    </div>
    <div class="main">
      <PlayerList :players="playersRemain" :onClick="onChoose" />
    </div>
  </div>
</template>

<script>
import PlayerList from '../PlayerList.vue';

export default {
  components: { PlayerList },

  props: ['players', 'onChoose', 'onClose'],

  data() {
    return { search: '' };
  },

  computed: {
    playersRemain() {
      const { players, search } = this;
      const pattern = new RegExp(search.toLowerCase());
      return players.filter(({ name }) => pattern.test(name.toLowerCase()));
    },
  },
};
</script>

<style lang="scss" scoped>
.selector {
  position: fixed;
  top: 65px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  z-index: 2;
  display: flex;
  max-width: 850px;
  margin: 0 auto;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: opacity .5s;

  &.active {
    opacity: 0.95;
    pointer-events: initial;
  }
}

.header {
  position: sticky;
  top: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 20px;
  background: #555;
}

.input {
  width: 100%;
  border: 0;
  padding: 0 0.5em;
  line-height: 2;
}

.button {
  flex-shrink: 0;
  padding: 10px 20px;
  margin-right: -15px;
  cursor: pointer;
}

.main {
  padding: 10px;
  overflow: scroll;
}
</style>
