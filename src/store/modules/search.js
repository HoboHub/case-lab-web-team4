/* eslint no-shadow:  0 */ // --> OFF
// eslint-disable-next-line no-unused-vars
import searchApi from '@/services/search/searchApi';

const state = {
  users: '',

};
const getters = {
  getUsers: (state) => state.users,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  changeUsers(state, payload) {
    state.users = payload;
  },
};
const actions = {
  async fetchUsers({ commit }, { q, department, company }) {
    const response = await searchApi.getUsers(q, department, company, 'teacher');

    if (response) {
      commit('changeUsers', response);
    }
  },
  clearUsers({ commit }) {
    commit('changeUsers', '');
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
