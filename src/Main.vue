<template>
  <div>
    <Topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import router from 'vue-router';
import Topbar from './components/Topbar.vue';

export default {
  components: { Topbar },
}
</script>

<style lang="scss">
body {
  color: #fff;
  font-family: "jf-jinxuan-fresh2.2-book", sans-serif, "PingFang TC", "微軟正黑體";
  text-align: center;
  letter-spacing: 0.075em;
  background: #333;
}

* {
  box-sizing: border-box;
}

main {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px 10px;

  @media (min-width: 500px) { padding: 50px 10px 70px; }
}

.icon {
  width: 30px;
  height: 30px;
  filter: invert(1);
}

a {
  color: currentColor;
  text-decoration: none;
}
</style>
