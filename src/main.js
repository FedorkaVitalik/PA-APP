import Vue from "vue";
import Vuetify from "vuetify";
import VuetifyConfirm from "vuetify-confirm";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { date } from "./utils/postDateHelp";

Vue.use(Vuetify);

Vue.use(VuetifyConfirm, {
  buttonTrueText: "Ok",
  buttonFalseText: "Cancel",
  width: 400
});

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    date
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
