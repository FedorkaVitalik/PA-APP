/* eslint-disable no-console */
import axios from "axios";
import { config } from "../config";

export default {
  state: {
    user: {
      isAuthenticated: false,
      userData: {
        uId: null
      }
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user.isAuthenticated = true;
      state.user.userData = payload;

      localStorage.setItem("user", JSON.stringify(payload));
    },
    renewUser(state) {
      if (localStorage.getItem("user")) {
        state.user.isAuthenticated = true;
        state.user.userData = JSON.parse(localStorage.getItem("user"));
      }
    },
    unsetUser(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      state.user = {
        isAuthenticated: false,
        userData: {
          uId: null
        }
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

          commit("setUser", {
            fname: Response.data.newUser.fname,
            lname: Response.data.newUser.lname,
            email: Response.data.newUser.email,
            uId: Response.data.newUser._id
          });

          axios.defaults.headers.common["x-access-token"] = Response.data.token;
          localStorage.setItem("token", Response.data.token);
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
          commit("setUser", {
            fname: Response.data.updUser.fname,
            lname: Response.data.updUser.lname,
            email: Response.data.updUser.email,
            uId: Response.data.updUser._id
          });

          axios.defaults.headers.common["x-access-token"] = Response.data.updUser.token;
          localStorage.setItem("token", Response.data.updUser.token);
        })
        .catch(err => {
          commit("setProcessing", false);

          commit("setError", err.message);
        });
    },

    renewUser({ commit }) {
      if (localStorage.getItem("token")) {
        axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
        commit("renewUser");
      }
    },

    logout({ commit }, payload) {
      commit("setProcessing", false);
      commit("unsetUser");

      axios
        .delete(config.apiUrl + `/logout/${payload}`)
        .then(() => {})
        .catch(err => {
          commit("setProcessing", false);

          commit("setError", err.message);
        });
    },
    editUserData({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.put(config.apiUrl + "/profile/" + payload.uId, payload.newData).then(
          Response => {
            console.log(Response);
            commit("setProcessing", false);
            commit("setUser", {
              fname: Response.data.fname,
              lname: Response.data.lname,
              email: Response.data.email,
              uId: Response.data._id
            });
            resolve(Response);
          },
          error => {
            reject(error);
          }
        );
      });
    }
  },
  getters: {
    isUserAuthenticated: state => state.user.isAuthenticated,
    userData: state => state.user.userData,
    uId: state => state.user.userData.uId
  }
};
