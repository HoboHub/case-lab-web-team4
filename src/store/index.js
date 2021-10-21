import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';

export default createStore({
  state: {
    tracks: null,
  },
  getters: {
    getTracks(state) {
      return state.tracks;
    },
  },
  mutations: {
    changeTracks(state, payload) {
      state.tracks = payload;
    },
  },
  actions: {
    async getTracks({ commit }) {
      const response = await ServiceApi.get('rosatom', '/tracks');
      commit('changeTracks', response);
      console.log(response);
    },
  },
  modules: {
  },
});
