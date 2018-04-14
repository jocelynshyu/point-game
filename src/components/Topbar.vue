<template>
  <div class="topbar">
    <router-link :to="{ name: 'home' }" class="link">
      <img class="icon logo" src="static/images/favicon.png" alt="尋云羽球積分網" />
      <h1 class="title">翻<span class="gray">尋</span>云覆羽<span class="gray">球積分網</span></h1>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  height: 60px;
  background: #1d1f20;
}

.gray {
  color: #555;
  transition: color .3s;
}

.link {
  display: flex;
  align-items: center;
  padding: 2px 20px 0;
  color: currentColor;
  background: inherit;
  transition: background .3s;

  &:hover {
    background: #000;

    .gray { color: currentColor; }
  }
}

.logo {
  margin: 0 10px 0 0;
}

.title {
  margin: 0;
  font-size: 1.4em;
  font-weight: 500;
}
</style>
