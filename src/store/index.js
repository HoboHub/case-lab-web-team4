import { createStore } from 'vuex';
import search from './modules/search';
import corporation from './modules/corporation';
import trackDetails from './modules/trackDetails.store';
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
import { formatDates, reformatDates } from '@/helpers/reformatDatesHelper';
import track from '@/services/track/track';
import tokens from '@/services/tokens';

export default createStore({
  state: {
    user: {
      role: getItem('userRole') || '',
      token: getItem('token') || '',
    },
    tracks: getItem('tracks') || '',

    isSuccess: null,
    isLoading: false,
  },

  getters: {
    getUser: (state) => state.user,
    getTracks: (state) => state.tracks,
    getTrackByIdStore: (state) => (id) => [...state.tracks].find((t) => t.id === id),
    getSuccessStatus: (state) => state.isSuccess,
    getLoadingStatus: (state) => state.isLoading,

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
      // eslint-disable-next-line no-unused-expressions
      Object.keys(payload.currentTrack).forEach((key) => {
        if (payload.form[key]) {
          payload.currentTrack[key] = payload.form[key];
        }
      });
      setItem('tracks', state.tracks);
    },

    removeTracks(state) {
      state.tracks = '';
      removeItem('tracks');
    },

    removeTrack(state, payload) {
      state.tracks = state.tracks.filter((i) => i.id !== payload);
      setItem('tracks', state.tracks);
    },

    changeSuccessStatus(state, payload) {
      state.isSuccess = payload;
    },

    changeLoadingStatus(state, payload) {
      state.isLoading = payload;
    },

  },

  actions: {
    changeUser({ commit }, role) {
      commit('setUser', role);
    },

    async fetchTracks({ commit }) {
      commit('changeLoadingStatus', true);
      const response = await track.getTracks(this.state.user.role);
      // console.log(response);
      if (response.data && response.data.length) {
        if (this.state.user.role !== 'teacher') {
          response.data = response.data.filter((item) => item.data.published === true);
        }
        response.data.map((i) => reformatDates(i.data));
        commit('changeTracks', response.data);
        commit('changeSuccessStatus', true);
      }
      commit('changeLoadingStatus', false);
    },

    async createTrack({ commit }, form) {
      // проверяем, загрузил ли пользователь изображение, и, если да,
      // заменяем ссылку в previewPicture
      if (form.previewPicture instanceof FormData) {
        const imgUrl = await track.uploadImage(form.previewPicture, this.getters.getUser.role);
        form.previewPicture = imgUrl;
      }
      form = formatDates(form);
      const response = await track.createTrack(form, this.getters.getUser.role);
      if (response) {
        commit('removeTracks');
        commit('changeSuccessStatus', true);
      } else {
        commit('changeSuccessStatus', false);
      }
    },

    async editTrack({ commit, state }, data) {
      if (data.form.previewPicture instanceof FormData) {
        data.form.previewPicture = await track.uploadImage(data.form.previewPicture,
          this.getters.getUser.role);
      }
      data.form = formatDates(data.form);
      const response = await track.changeTrack(data.id, data.form, this.getters.getUser.role);
      if (response) {
        data.form = reformatDates(data.form);

        const trackIndex = state.tracks.findIndex((i) => i.id === data.id);
        const currentTrack = state.tracks[trackIndex].data;
        commit('changeTrack', { currentTrack, form: data.form });
        commit('changeSuccessStatus', true);
      } else {
        commit('changeSuccessStatus', false);
      }
    },

    clearTracks({ commit }) {
      commit('removeTracks');
    },
    // удаление отдельного трека
    async removeTrack({ commit }, id) {
      const response = await track.removeTrack(id, this.state.user.role);
      if (response) {
        commit('changeSuccessStatus', true);
        commit('removeTrack', id);
      } else {
        commit('changeSuccessStatus', false);
      }
    },

    changeSuccessStatus({ commit }, status) {
      commit('changeSuccessStatus', status);
    },

  },

  modules: { search, corporation, trackDetails },
});
