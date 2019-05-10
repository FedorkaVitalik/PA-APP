import Vue from "vue";
import Vuex from "vuex";

import user from "./store/user";
import general from "./store/general";
import posts from "./store/posts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    general,
    posts
  }
});
