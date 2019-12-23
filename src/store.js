import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    records: {}
  },
  getters: {
    records: state => {
      return state.records;
    },
    tables: state => {
      var result = {};

      var records = state.records;

      for (let id in records) {
        var record = records[id];
        var year = record.date.year;
        var month = record.date.month;

        result[year] = result[year] || {};
        result[year][month] = result[year][month] || [];

        result[year][month].push(record);
      }

      return result;
    },
    getRecordsByYearAndMonth: state => (year, month) => {
      var recordSatisfies = (record, y, m) => {
        var satisfiesYear = record.date.year === y;
        var satisfiesMonth = record.date.month === m;

        return satisfiesYear && satisfiesMonth;
      };

      var result = [];

      var records = state.records;

      for (let id in records) {
        var record = records[id];

        if (recordSatisfies(record, year, month)) {
          result.push(record);
        }
      }

      return result.sort((a, b) => a.date.day - b.date.day);
    }
  },
  mutations: {
    addRecord(state, data) {
      Vue.set(
        state.records,
        data.id,
        Object.assign(data, {
          type: data.type || "",
          detail: data.detail || "",
          amountReceived: data.amountReceived || 0,
          amountInvested: data.amountInvested || 0,
          dateCreated: Date.now()
        })
      );
    },
    updateRecord(state, data) {
      let id = data.id;
      state.records[id] = Object.assign(state.records[id], data);
    },
    deleteRecord(state, id) {
      Vue.delete(state.records, id);
    }
  },
  actions: {
    addRecord({ getters, commit }, data) {
      let id = window.app.generateUuid();
      commit("addRecord", Object.assign(data, { id }));
      return getters.records[id];
    },
    updateRecord({ commit }, data) {
      commit("updateRecord", data);
    },
    deleteRecord({ commit }, id) {
      commit("deleteRecord", id);
    }
  }
});
