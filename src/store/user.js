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
    },
    unsetUser(state) {
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
