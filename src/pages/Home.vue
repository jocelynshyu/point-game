<template>
  <main class="home">
    <router-link
      v-for="{ name, icon, alt } in links"
      class="home-link"
      :key="name"
      :to="{ name }"
    >
      <img class="icon" :src="icon" :alt="alt" />
      <span>{{ alt }}</span>
    </router-link>
  </main>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: 'rank', icon: 'static/images/rank.png' , alt: '英雄榜' },
        { name: 'battle', icon: 'static/images/fire.png' , alt: 'FIGHT' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 480px) {
    flex-direction: row;
  }
}

.home-link {
  display: flex;
  width: 150px;
  height: 150px;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
  transition: filter 0.3s;
  will-change: transform;

  &:first-child { background: #214fb0; }
  &:last-child { background: #dd4745; }

  .icon {
    margin: 10px 0 20px;
    transition: transform 0.3s;
  }

  &:hover {
    filter: brightness(1.2);
    .icon { transform: scale(1.5) rotate(360deg); }
  }
}
</style>
