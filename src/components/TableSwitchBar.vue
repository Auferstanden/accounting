<template>
  <div>
    <div class="TableSwitchBar">
      <div class="year-selector"><input type="number" v-model="year" />年</div>
      <ul class="month-selector">
        <li
          :class="{ active: month === i }"
          v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          :key="i"
          @click="month = i"
        >
          <button>{{ i }}月</button>
        </li>
      </ul>
    </div>

    <div class="pad"></div>
  </div>
</template>

<script>
export default {
  name: "TableSwitchBar",
  computed: {
    year: {
      get() {
        return (
          Number(this.$route.params.year) || Number(new Date().getFullYear())
        );
      },
      set(year) {
        if (year == -1) {
          this.year = window.prompt();
        } else {
          this.$router.replace({
            name: "table",
            params: {
              year,
              month: this.month
            }
          });
        }
      }
    },
    month: {
      get() {
        return Number(this.$route.params.month);
      },
      set(month) {
        this.$router.replace({
          name: "table",
          params: {
            year: this.year,
            month
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.TableSwitchBar {
  background: #fff;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: 32px;
  // white-space: nowrap;
}

.year-selector {
  text-align: center;
  float: left;
  width: 100px;
  text-align: center;
  display: flex;
  margin-right: 5px;

  & input {
    text-align: center;
    background: #eee;
    margin-right: 5px;
    font-size: 18px;
  }
}

.month-selector {
  & button {
    padding: 0 10px;
  }

  & > li {
    display: inline-block;
    line-height: 26px;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;

    &.active {
      border-top: 3px solid #444;
      background: #eee;
      font-weight: bold;
    }

    &:hover {
      background: #eee;
    }
  }
}

.pad {
  height: 32px;
}
</style>
