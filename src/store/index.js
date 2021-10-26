import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default createStore({
  state: {
    userRole: JSON.parse(sessionStorage.getItem('userRole')) || null,
    token: JSON.parse(sessionStorage.getItem('token')) || null,
    tracks: JSON.parse(localStorage.getItem('tracks')) || [],
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    },

    getToken(state) {
      return state.token;
    },

    getTracks(state) {
      return state.tracks;
    },

    getTrackById: (state) => (id) => [...state.tracks].find((t) => t.id === id),
  },
  mutations: {
    setRole(state, payload) {
      state.userRole = payload.userRole;
      sessionStorage.setItem('userRole', JSON.stringify(state.userRole));
    },

    setToken(state, payload) {
      state.token = payload;
      sessionStorage.setItem('token', JSON.stringify(state.token));
    },

    changeTracks(state, payload) {
      state.tracks.push(...payload.data);
      localStorage.setItem('tracks', JSON.stringify(state.tracks));
    },
  },
  actions: {
    changeUserRole({ commit }, role) {
      commit('setRole', { userRole: role });
    },

    changeToken({ commit }, role) {
      commit('setToken', tokens[role]);
    },

    async getTracks({ commit }, token) {
      console.log(token);
      const response = await ServiceApi.get('rosatom', '/tracks', {
        headers: {
          'X-API-KEY': token,
        },
      });
      commit('changeTracks', response);
    },
  },
  modules: {
  },
});
