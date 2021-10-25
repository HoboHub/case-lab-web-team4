import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';

export default createStore({
  state: {
    userRole: null,
    tracks: JSON.parse(localStorage.getItem('tracks')) || [],
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    },

    getTracks(state) {
      return state.tracks;
    },

    getTrackById: (state) => (id) => {
      return [...state.tracks].find((t) => t.id == id)

    }
  },
  mutations: {
    changeUserRole(state, payload) {
      state.userRole = payload.userRole;
    },

    changeTracks(state, payload) {
      state.tracks.push(...payload.data)
      localStorage.setItem('tracks', JSON.stringify(state.tracks))
    },
  },
  actions: {
    async getTracks({ commit }) {
      const response = await ServiceApi.get('rosatom', '/tracks',);
      commit('changeTracks', response);
    },
  },
  modules: {
  },
});
