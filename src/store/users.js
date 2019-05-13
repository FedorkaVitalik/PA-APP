/* eslint-disable no-console */
import axios from "axios";
import { config } from "../config";

export default {
  state: {
    users: []
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    loadUsers({ commit }) {
      commit("setProcessing", true);
      commit("clearError");

      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + "/users").then(
          Response => {
            commit("setProcessing", false);

            commit("setUsers", Response.data);
            resolve(Response);
          },
          error => {
            commit("setProcessing", false);

            commit("setError", error.message);
            reject(error);
            window.location.href = "/";
          }
        );
      });
    },
    async follow({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      await axios
        .patch(config.apiUrl + "/follow/" + payload)
        .then(Response => {
          console.log(Response);
          commit("setProcessing", false);
        })
        .catch(error => {
          console.log(error);
          commit("setProcessing", false);

          commit("setError", error.message);
        });
    },
    async unFollow({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      await axios
        .patch(config.apiUrl + "/unFollow/" + payload)
        .then(Response => {
          console.log(Response);
          commit("setProcessing", false);
        })
        .catch(error => {
          console.log(error);
          commit("setProcessing", false);

          commit("setError", error.message);
        });
    }
  },
  getters: {
    getUsers: state => state.users,
    getMyFollowers: (state, rootState) =>
      state.users.filter(user => user.following.includes(rootState.uId))
  }
};
