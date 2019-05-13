/* eslint-disable no-console */
import axios from "axios";
import { config } from "../config";

export default {
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },

    addPost(state, payload) {
      state.posts.push(payload);
    },
    editPost(state, payload) {
      const foundPost = state.posts.findIndex(post => post._id === payload.postId);
      state.posts[foundPost] = payload.postData;
    },
    deletePost(state, payload) {
      const i = state.posts.map(post => post._id).indexOf(payload);
      state.posts.splice(i, 1);
    }
  },
  actions: {
    loadPosts({ commit }) {
      commit("setProcessing", true);
      commit("clearError");

      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + "/posts").then(
          Response => {
            commit("setProcessing", false);

            commit("setPosts", Response.data);
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
    loadMyPosts({ commit }) {
      commit("setProcessing", true);
      commit("clearError");

      return new Promise((resolve, reject) => {
        axios.get(config.apiUrl + "/myPosts").then(
          Response => {
            commit("setProcessing", false);

            commit("setPosts", Response.data);
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
    async likePost({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      await axios
        .patch(config.apiUrl + "/posts/likePost/" + payload)
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
    async unlikePost({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      await axios
        .patch(config.apiUrl + "/posts/unlikePost/" + payload)
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
    addPost({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      axios
        .post(config.apiUrl + "/posts", payload)
        .then(Response => {
          console.log(Response);
          commit("addPost", Response.data);
          commit("setProcessing", false);
        })
        .catch(error => {
          console.log(error);
          commit("setProcessing", false);

          commit("setError", error.message);
        });
    },
    async editPost({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      commit("editPost", payload);
      await axios
        .put(config.apiUrl + "/posts/" + payload.postId, payload.postData)
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
    deletePost({ commit }, payload) {
      commit("setProcessing", true);
      commit("clearError");

      commit("deletePost", payload);
      axios
        .delete(config.apiUrl + "/posts/" + payload)
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
    getPosts: state => state.posts,
    getMyPosts: (state, rootState) =>
      state.posts.filter(post => post.createdBy._id === rootState.uId)
  }
};
