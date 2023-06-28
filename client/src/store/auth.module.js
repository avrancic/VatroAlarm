import AuthService from '@/services/AuthService';
import VueJwtDecode from "vue-jwt-decode";

const jwl = localStorage.getItem('jwl');

const initialState = jwl != null
  ? { status: { loggedIn: true }, data: VueJwtDecode.decode(jwl) }
  : { status: { loggedIn: false }, data: null };


export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, login) {
      return AuthService.login(login).then(
        token => {
          commit('loginSuccess', token);
          return Promise.resolve(token);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, jwl) {
      state.status.loggedIn = true;
      state.data = VueJwtDecode.decode(jwl);
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.data = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.data = null;
    },
  }
};