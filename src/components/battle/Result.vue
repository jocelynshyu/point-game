<template>
  <div>
    <p class="slogan">{{result.title}}</p>
    <p>獲勝得到 {{result.winPoints}} 分</p>
    <p>失敗扣除 {{result.losePoints}} 分</p>
  </div>
</template>

<script>
export default {
  props: ['result'],
};
</script>

<style lang="scss" scoped>
.slogan {
  margin: 0;
  font-size: 30px;
  line-height: 2;
}
</style>
