/* eslint-disable no-console */
import axios from "axios";
import { config } from "../config";

export default {
  state: {
    user: {
      isAuthenticated: false,
      uId: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.uId = payload;
    },
    unsetUser(state) {
      state.user = {
        isAuthenticated: false,
        uId: null
      };
    }
  },
  actions: {
    signup({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      axios
        .post(config.apiUrl + "/signup", payload)
        .then(Response => {
          commit("setProcessing", false);

          commit("setUser", Response.data.newUser._id);

          axios.defaults.headers.common["x-access-token"] = Response.data.updUser.token;
        })
        .catch(err => {
          commit("setProcessing", false);

          commit("setError", err.message);
        });
    },
    login({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      axios
        .put(config.apiUrl + "/login", payload)
        .then(Response => {
          commit("setProcessing", false);
          commit("setUser", Response.data.updUser._id);

          axios.defaults.headers.common["x-access-token"] = Response.data.updUser.token;
        })
        .catch(err => {
          commit("setProcessing", false);

          commit("setError", err.message);
        });
    },
    logout({ commit }, payload) {
      axios
        .delete(config.apiUrl + `/logout/${payload}`)
        .then(() => {
          commit("setProcessing", false);
          commit("unsetUser");
        })
        .catch(err => {
          commit("setProcessing", false);

          commit("setError", err.message);
        });
    }
  },
  getters: {
    isUserAuthenticated: state => state.user.isAuthenticated,
    uId: state => state.user.uId
  }
};
