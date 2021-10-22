import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';

export default createStore({
  state: {
    userRole: 'teacher',
    tracks: null,
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    },

    getTracks(state) {
      return state.tracks;
    },
  },
  mutations: {
    changeUserRole(state, payload) {
      state.userRole = payload.userRole;
    },

    changeTracks(state, payload) {
      state.tracks = payload;
    },
  },
  actions: {
    async getTracks({ commit }) {
      const response = await ServiceApi.get('rosatom', '/tracks');
      commit('changeTracks', response);
    },
  },
  modules: {
  },
});
