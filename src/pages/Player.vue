<template>
  <main>
    <ProfileCard v-if="detail.id" :player="detail" />

    <ul>
      <Record
        v-for="(record, i) in records"
        :key="i"
        :record="record"
        :me="detail.id"
      />
    </ul>
  </main>
</template>

<script>
import { getPlayerDetail, getPlayerRecords } from '../functions/getData';
import ProfileCard from '../components/ProfileCard.vue';
import Record from '../components/record/Record.vue';

export default {
  components: { ProfileCard, Record },

  data() {
    return {
      detail: {},
      records: [],
    };
  },

  methods: {
    updateData(data, fieldName) {
      const value = data || JSON.parse(localStorage.getItem(fieldName));
      if (value) this[fieldName] = value;
    },

    getNewData() {
      const { id } = this.$route.params;
      getPlayerDetail(id).then((detail) => this.updateData(detail, 'detail'));
      getPlayerRecords(id).then((records) => this.updateData(records, 'records'));
    },
  },

  mounted() {
    if (window.localStorage) {
      this.updateData(null, 'detail');
      this.updateData(null, 'records');
    }

    this.getNewData();
  },

  watch: {
    '$route' (to, from) {
      if (to.params.id !== from.params.id) this.getNewData();
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  padding: 0;
  flex-direction: column;
  align-items: center;
}
</style>
