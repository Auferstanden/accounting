<template>
  <div id="table-selector">
    <ul class="options">
      <li
        v-for="year in years"
        :key="year"
        :class="{
          selected: year === selectedYear
        }"
        @click="selectedYear = year"
        v-show="selectedYear == null || year == selectedYear"
      >
        {{ year }}年
      </li>
    </ul>
    <ul class="options" v-if="selectedYear != null">
      <li
        v-for="month in months"
        :key="month"
        :class="{
          selected: month === selectedMonth
        }"
        @click="selectedMonth = month"
        v-show="selectedMonth == null || month == selectedMonth"
      >
        {{ month }}月
      </li>
    </ul>
    <p v-if="selectedYear == null">金銭出納表の年を選択してください。</p>
    <p v-else-if="selectedMonth == null">金銭出納表の月を選択してください。</p>
    <p v-else>
      {{ selectedYear }}年{{
        selectedMonth
      }}月の金銭出納表を読み込んでいます。しばらくお待ちください。
    </p>
  </div>
</template>

<script>
export default {
  name: "TableSelector",
  computed: {
    years() {
      var tables = this.$store.getters.tables;
      var years = Object.keys(tables);

      return years;
    },
    months() {
      var tables = this.$store.getters.tables;
      var target = tables[this.selectedYear];

      return Object.keys(target);
    }
  },
  data() {
    return {
      selectedYear: null,
      selectedMonth: null
    };
  },
  components: {}
};
</script>

<style scoped lang="stylus">
.options {
  display: inline-block;
  padding-bottom: 8px;
}

.options > li {
  cursor: pointer;
  display: inline-block;
  background: #fff;
  padding: 8px 12px;
  margin-right: 6px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  line-height: 1;

  &.hover {
    background: #ddd;
  }

  &.selected {
    background: #444;
    color: #fff;
  }
}
</style>
