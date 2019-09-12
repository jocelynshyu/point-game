<template>
  <main>
    <div>
      <a href="https://www.battlegee.cc/">
        <img src="https://www.battlegee.cc/assets/images/chicken-little.png" alt="戰雞 BattleGee" />
        戰雞 BattleGee
      </a>
    </div>
    <div>
      <h2>我們有正式網站了<br />快去看看吧！</h2>
      <p>除了瀏覽排名、個人戰績外<br />還有更多更完整的功能 =D</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
a {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 30px;
  font-size: 1.5em;
  padding: 20px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 15px #fff;

  @media (min-width: 600px) {
    margin: 0 30px 0 0;
    padding: 10px 20px;
  }
}

img {
  width: 150px;

  @media (min-width: 600px) {
    width: 200px;
  }
}
</style>
