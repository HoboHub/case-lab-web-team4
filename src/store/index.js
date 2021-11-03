import { createStore } from 'vuex';
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
import { reformatDates } from '@/helpers/reformatDatesHelper';
import ServiceApi from '@/services/serviceApi';
import track from '@/services/track/track';
import tokens from '@/services/tokens';

export default createStore({
  state: {
    user: {
      role: getItem('userRole') || '',
      token: getItem('token') || '',
    },
    tracks: getItem('tracks') || '',
    isSubmitting: false,
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
        setItem('userRole', state.user.role);
      } else {
        removeItem('userRole');
      }

      if (state.user.token) {
        setItem('token', state.user.token);
      } else {
        removeItem('token');
      }
    },

    changeTracks(state, payload) {
      state.tracks = payload;
      setItem('tracks', state.tracks);
    },

    addTrack(state, payload) {
      state.tracks = state.tracks.push(payload);
      setItem('tracks', state.tracks);
    },

    changeTrack(state, payload) {
      const trackIndex = state.tracks.findIndex((i) => i.id === payload.id);
      const currentTrack = state.tracks[trackIndex].data;
      // eslint-disable-next-line no-unused-expressions
      Object.keys(currentTrack).forEach((key) => {
        if (payload.form[key]) {
          currentTrack[key] = payload.form[key];
        }
      });
      setItem('tracks', state.tracks);
    },

    removeTracks(state) {
      state.tracks = '';
      removeItem('tracks');
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
        response.data.map((i) => reformatDates(i.data));
        commit('changeTracks', response.data);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async createTrack({ commit }, form) {
      if (form.previewPicture instanceof FormData) {
        const imgUrl = await track.uploadImage(form.previewPicture, 'teacher');
        // eslint-disable-next-line no-param-reassign
        form.previewPicture = imgUrl;
      }
      await track.createTrack(form, 'teacher');
      commit('removeTracks');
    },

    // eslint-disable-next-line no-unused-vars
    async editTrack({ commit }, data) {
      if (data.form.previewPicture instanceof FormData) {
        // eslint-disable-next-line no-param-reassign
        data.form.previewPicture = await track.uploadImage(data.form.previewPicture, 'teacher');
      }
      await track.changeTrack(data.id, data.form, 'teacher');
      // eslint-disable-next-line no-param-reassign
      data.form = reformatDates(data.form);
      commit('changeTrack', { id: data.id, form: data.form });
    },

    clearTracks({ commit }) {
      commit('removeTracks');
    },

  },

  modules: {},
});
