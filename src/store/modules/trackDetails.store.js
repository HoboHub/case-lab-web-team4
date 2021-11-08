/* eslint no-shadow:  0 */ // --> OFF
import TrackDetail from '@/services/track/trackDetail';
import { setItem, getItem } from '@/helpers/localStorageHelper';

const state = {
  trackAndDetails: getItem('details') || [], // Массив. Содержит айди трека и объект с деталями

  globalDetails: '',
};

const getters = {
  // eslint-disable-next-line no-unused-vars
  getTrackDetailsFromStore: (state) => (id) => state.trackAndDetails.find((i) => i.id === id),
};
const mutations = {
  addTrackDetails(state, payload) {
    state.trackAndDetails.push(payload);
    setItem('details', state.trackAndDetails);
  },
  removeTrackDetails(state, payload) {
    state.trackAndDetails = state.trackAndDetails.filter((i) => i.id !== payload);
  },

  changeDetail(state, payload) {
    // eslint-disable-next-line no-param-reassign
    payload.detail.data = payload.newData;
    setItem('details', state.trackAndDetails);
  },

  changeGlobalDetails(state, payload) {
    state.globalDetails = payload;
  },
};

const actions = {

  // Получить элементы трека ----------------------
  async getTrackDetails({ commit }, trackId) {
    const response = await TrackDetail.getTrackDetail(trackId, 'teacher');
    if (response) {
      commit('addTrackDetails', { id: trackId, details: response });
    }
  },
  async addDetailToTrack({ commit }, data) {
    const response = await TrackDetail.addDetailToTrack(data.trackId, data.detailData, 'teacher');
    if (response) {
      commit('removeTrackDetails', data.trackId);
    }
  },

  async changeTrackDetailData({ commit, state }, data) {
    const response = await TrackDetail.changeTrackDetailData(data.id, data.newData, 'teacher');
    if (response) {
      // Здесь мы делаем массив из details внутри массива details (там [{id: xx, details: xx}, ..]
      const detailsList = [...state.trackAndDetails.map((i) => i.details)].flat();
      const detail = detailsList.find((i) => i.id === data.id);
      commit('changeDetail', { detail, newData: data.newData });
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
};

export default {
  state, getters, mutations, actions,
};
