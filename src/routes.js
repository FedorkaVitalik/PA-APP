import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";

import store from "./store";

Vue.use(Router);

export const routes = [
  {
    path: "/posts",
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
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: AuthGuard
  }
];

function AuthGuard(from, to, next) {
  store.dispatch("renewUser");
  if (store.getters.isUserAuthenticated) {
    next();
  } else {
    next("/login");
  }
}
