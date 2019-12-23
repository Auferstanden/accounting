import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;

window.app = new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    generateUuid() {
      let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");

      for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
          case "x":
            chars[i] = Math.floor(Math.random() * 16).toString(16);
            break;

          case "y":
            chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        }
      }

      return chars.join("");
    }
  }
}).$mount("#app");
