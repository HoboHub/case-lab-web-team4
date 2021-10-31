import { createStore } from 'vuex';
import ServiceApi from '@/services/serviceApi';
import tokens from '@/services/tokens';

export default createStore({
  state: {
    user: {
      role: JSON.parse(sessionStorage.getItem('userRole')) || '',
      token: JSON.parse(sessionStorage.getItem('token')) || '',
    },
    tracks: JSON.parse(sessionStorage.getItem('tracks')) || '',
  },

  getters: {
    getUser: (state) => state.user,
    getTracks: (state) => state.tracks,
    getTrackByIdStore: (state) => (id) => [...state.tracks].find((t) => t.id === id),
  },

  mutations: {
    setUser(state, role) {
      state.user.role = role;
      state.user.token = tokens[role];

      if (state.user.role) {
        sessionStorage.setItem('userRole', JSON.stringify(state.user.role));
      } else {
        sessionStorage.removeItem('userRole');
      }

      if (state.user.token) {
        sessionStorage.setItem('token', JSON.stringify(state.user.token));
      } else {
        sessionStorage.removeItem('token');
      }
    },

    changeTracks(state, payload) {
      state.tracks = payload;

      if (state.tracks && state.tracks.length) {
        sessionStorage.setItem('tracks', JSON.stringify(state.tracks));
      } else {
        sessionStorage.removeItem('tracks');
      }
    },
  },

  actions: {
    changeUser({ commit }, role) {
      commit('setUser', role);
    },

    async fetchTracks({ commit }, token) {
      const response = await ServiceApi.get('rosatom', '/tracks', {
        headers: {
          'X-API-KEY': token,
        },
      });

      if (this.state.user.role !== 'teacher') {
        response.data = response.data.filter((item) => item.data.published === true);
      }
      // console.log(response);
      if (response.data && response.data.length) {
        commit('changeTracks', response.data);
      }
    },

    clearTracks({ commit }) {
      commit('changeTracks', '');
    },

  },

  modules: {},
});
