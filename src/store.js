import Vue from "vue";
import Vuex from "vuex";

import user from "./store/user";
import general from "./store/general";
import posts from "./store/posts";
import users from "./store/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    general,
    posts,
    users
  }
});
