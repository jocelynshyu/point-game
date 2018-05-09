<template>
  <div class="record-adder">
    <div class="btn" :class="{ active }" @click="toggleActive">
      <img v-if="!active" class="icon" src="static/images/record-add.png" alt="登記成績" />
      <img v-if="active" class="icon" src="static/images/close.png" alt="取消" />
    </div>

    <div class="modal" :class="{ active }">
      <div class="line">
        <input class="input input--number" type="number" v-model="score1" />
        <span>比分</span>
        <input class="input input--number" type="number" v-model="score2" />
      </div>

      <input class="input input--text" type="password" placeholder="請輸入短期金鑰" v-model="password" />

      <p v-if="error" class="error">{{ error }}</p>
      <button class="submit" @click="addRecord">送出</button>
    </div>
  </div>
</template>

<script>
import { addRecord } from '../../functions/postData';

export default {
  props: ['team1', 'team2', 'onFinish'],

  data() {
    return {
      active: false,
      password: '',
      score1: 21,
      score2: 19,
      error: '',
    };
  },

  methods: {
    toggleActive() {
      this.active = !this.active;
    },

    addRecord() {
      const { team1, team2, score1, score2, password, addRecordFinish, addRecordFail } = this;
      addRecord({
        password,
        team1_id: team1.filter(m => m),
        team2_id: team2.filter(m => m),
        team1_score: score1,
        team2_score: score2,
      }, addRecordFinish, addRecordFail);
    },

    addRecordFinish() {
      this.error = '';
      this.onFinish();
      this.toggleActive();

      setTimeout(() => {
        this.score1 = 21;
        this.score2 = 19;
        this.password= '';
      }, 500);
    },

    addRecordFail(error) {
      this.error = error;
    },
  },
}
</script>

<style lang="scss" scoped>
.record-adder {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: inherit;
}

.btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  padding: 10px 16px;
  margin: 0 auto;
  background: #333;
  border-radius: 50%;
  cursor: pointer;
  transition: background .3s;

  &:hover,
  &.active {
    background: #000;
  }
}

.modal {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 110px;
  z-index: 1;
  width: 300px;
  margin: 0 auto;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  pointer-events: none;
  opacity: 0;
  transform: translate(0, 20%);
  transition: opacity 0.3s, transform 0.3s;

  &.active {
    opacity: 1;
    transform: translate(0, 0);
    pointer-events: initial;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 1.2em;
    height: 1.2em;
    background: linear-gradient(135deg, transparent 49%, rgba(0, 0, 0, 0.75) 50%);
    transform: translate(-50%, 50%) rotate(45deg);
  }
}

.input {
  width: 100%;
  margin: 5px 0;
  border: 0;
  padding: 0 0.5em;
  font-size: 16px;
  line-height: 2.5;
  text-align: center;
  background: #fff;
  border-radius: 5px;
}
.input--number { width: 4em; }

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.submit {
  width: 100%;
  margin: 25px 0 5px;
  border: 0;
  font-size: 16px;
  line-height: 2.5;
  background: #3fd239;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  position: relative;
  margin-bottom: 0;
  padding-left: 1.2em;
  color: #dd4745;
  line-height: 1.5;
  text-align: left;

  &::before {
    content: "!";
    position: absolute;
    top: 0;
    left: 0.5em;
  }
}
</style>
