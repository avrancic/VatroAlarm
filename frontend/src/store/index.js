import { createStore } from 'vuex'
import router from "@/router";
import LoginDataService from '@/services/User/LoginDataService';

export default createStore({
  state: {
    colors: [],
    token: "",
    expiration: Date.now(),
    isBusy: false,
    error: ""
  },
  mutations: {
    setBusy: (state) => state.isBusy = true,
    clearBusy: (state) => state.isBusy = false,
    setError: (state, error) => state.error = error,
    clearError: (state) => state.error = "",
    setToken: (state, model) => {
      state.token = model.token;
      state.expiration = new Date(model.expiration)
    },
    clearToken: (state) => {
      state.token = "";
      state.expiration = Date.now();
    }
  },
  getters: {
    isAuthenticated: (state) => state.token.length > 0 && state.expiration > Date.now()
  },
  actions: {
    login: async ({ commit }, { username, password }) => {
      try {
        commit("setBusy");
        commit("clearError");
        LoginDataService.login({
          username: username,
          password: password
        })
          .then(result => {
            if (result.status === 200) {
              commit("setToken", result.data);
              router.push("/");
            }
          }, err => {
            console.log(err.response);
            commit("setError", "Authentication Failed");
          })
      } catch {
        commit("setError", "Failed to login");
      } finally {
        commit("clearBusy");
      }
    },
    logout: ({ commit }) => {
      commit("clearToken");
      router.push("/");
    }
  }
})