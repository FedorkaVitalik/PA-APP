export default {
  state: {
    user: {
      isAuthenticated: false,
      uId: null
    }
  },
  mutations: {},
  actions: {},
  getters: {
    isUserAuthenticated: state => state.user.isAuthenticated
  }
};
