<template>
  <div class="topbar">
    <router-link :to="{ name: 'home' }" class="link home-link">
      <h1 class="title">翻<span class="gray">尋</span>云覆羽<span class="gray">球積分網</span></h1>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #1d1f20;

  &:hover .gray { color: currentColor; }
}

.home-link {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  color: currentColor;
}

.gray {
  color: #555;
  transition: color .3s;
}

.title {
  display: flex;
  margin: 0;
  font-size: 1.4em;
  font-weight: 500;
}
</style>
