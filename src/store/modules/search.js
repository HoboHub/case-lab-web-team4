/* eslint no-shadow:  0 */ // --> OFF
// eslint-disable-next-line no-unused-vars
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
import searchApi from '@/services/search/searchApi';

const state = {
  users: getItem('users') || '',

};
const getters = {
  getUsers: (state) => state.users,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  changeUsers(state, payload) {
    state.users = payload;
    setItem('users', payload);
  },
};
const actions = {
  async fetchUsers({ commit }) {
    const response = await searchApi.getUsers('teacher');

    if (response) {
      commit('changeUsers', response);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
