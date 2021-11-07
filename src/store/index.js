import { createStore } from 'vuex';
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
import { reformatDates } from '@/helpers/reformatDatesHelper';
import ServiceApi from '@/services/serviceApi';
import track from '@/services/track/track';
import tokens from '@/services/tokens';

import TrackDetail from '../services/track/trackDetail';
// import { getAllDetails } from '@/services/track/trackDetails';

export default createStore({
  state: {
    user: {
      role: getItem('userRole') || '',
      token: getItem('token') || '',
    },
    tracks: getItem('tracks') || '',

    trackDetails: getItem('trackDetails') || [],

    isSuccess: null,
  },

  getters: {
    getUser: (state) => state.user,
    getTracks: (state) => state.tracks,
    getTrackByIdStore: (state) => (id) => [...state.tracks].find((t) => t.id === id),
    getSuccessStatus: (state) => state.isSuccess,

    // getTrackDetailsFromStore: (state) => (id) => state.trackDetails.find((i) => i === id),
    getTrackDetailsFromStore: (state) => (id) => [...state.trackDetails].find((t) => t.id === id),
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
          // eslint-disable-next-line no-param-reassign
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

    // add track element
    addTrackDetails(state, payload) {
      state.trackDetails.push(payload);
    },
    // delete track element from store
    removeTrackItem(state, payload) {
      state.trackDetails = state.trackDetails.filter((i) => i.id !== payload);
      setItem('trackDetails', state.trackDetails);
    },

    changeSuccessStatus(state, payload) {
      state.isSuccess = payload;
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
        commit('changeSuccessStatus', true);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async createTrack({ commit }, form) {
      // проверяем, загрузил ли пользователь изображение, и, если да,
      // заменяем ссылку в previewPicture
      if (form.previewPicture instanceof FormData) {
        const imgUrl = await track.uploadImage(form.previewPicture, 'teacher');
        // eslint-disable-next-line no-param-reassign
        form.previewPicture = imgUrl;
      }
      const response = await track.createTrack(form, 'teacher');
      if (response) {
        commit('removeTracks');
        commit('changeSuccessStatus', true);
      } else {
        commit('changeSuccessStatus', false);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async editTrack({ commit, state }, data) {
      if (data.form.previewPicture instanceof FormData) {
        // eslint-disable-next-line no-param-reassign
        data.form.previewPicture = await track.uploadImage(data.form.previewPicture, 'teacher');
      }

      const response = await track.changeTrack(data.id, data.form, 'teacher');
      if (response) {
        // eslint-disable-next-line no-param-reassign
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

    // Получить элементы трека ----------------------
    async getTrackDetails({ commit }, trackId) {
      console.log({ commit });
      const response = await TrackDetail.getTrackDetail(trackId, 'teacher');
      if (response) {
        commit('addTrackDetails', { id: trackId, details: response });
      }
    },

    // удаление отдельного элемента в треке ------------
    async removeTrackItem({ commit }, ids) {
      // console.log(commit);
      // const trackId = ids[0];
      const itemId = ids[1];
      // console.log('store: trackId = ', trackId);
      // console.log('store: id = ', itemId);
      const response = await TrackDetail.removeTrackItem(itemId, this.state.user.role);
      console.log(response);
      if (response) {
        commit('changeSuccessStatus', true);
        commit('removeTrackItem', itemId);
      } else {
        commit('changeSuccessStatus', false);
      }
    },
    // -----------------------------------------

    clearSuccess({ commit }) {
      commit('changeSuccessStatus', null);
    },

  },

  modules: {},
});
