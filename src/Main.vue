<template>
  <router-view></router-view>
</template>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 20px 10px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

a {
  color: currentColor;
  text-decoration: none;
}
</style>
