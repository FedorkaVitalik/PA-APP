import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    }
  ],
  mode: "history"
});

function AuthGuard(from, to, next) {
  if (store.getters.isUserAuthenticated) {
    next();
  } else {
    next("/login");
  }
}
