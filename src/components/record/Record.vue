<template>
  <li class="record">
    <RecordTeam :team="record.winners" :me="me" />
    <div class="points">
      <span class="point">{{record.winner_score}}</span>
      <span> : </span>
      <span class="point">{{record.loser_score}}</span>
    </div>
    <RecordTeam :team="record.losers" :me="me" />
  </li>
</template>

<script>
import RecordTeam from './RecordTeam.vue';

export default {
  components: { RecordTeam },
  props: ['record', 'me'],
};
</script>

<style lang="scss" scoped>
.record {
  position: relative;
  display: flex;
  padding: 10px 0;
  font-size: 1.2em;
  line-height: 1.5;
  align-items: center;

  & + &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background: #555;
  }
}

.points {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.point {
  width: 50px;
  font-size: 1.6em;
}
</style>
