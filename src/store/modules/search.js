/* eslint no-shadow:  0 */ // --> OFF
// eslint-disable-next-line no-unused-vars
import searchApi from '@/services/search/searchApi';

const state = {
  users: '',
  isLoading: false,

};
const getters = {
  getUsers: (state) => state.users,
  getLoadingStatus: (state) => state.isLoading,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  changeUsers(state, payload) {
    state.users = payload;
  },
  changeLoadingStatus(state, payload) {
    state.isLoading = payload;
  },
};
const actions = {
  async fetchUsers({ commit }, { q, department, company }) {
    if (q || department || company) { // без этого функция вызывается после очистки поля
      commit('changeLoadingStatus', true);
      const response = await searchApi.getUsers(q, department, company, 'teacher');
      if (response) {
        commit('changeUsers', response);
      }
      commit('changeLoadingStatus', false);
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
