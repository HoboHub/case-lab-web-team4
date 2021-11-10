/* eslint no-shadow:  0 */ // --> OFF
import { getItem, setItem } from '@/helpers/localStorageHelper';
import corporationApi from '@/services/search/corporationApi';

const state = {
  departments: getItem('departments') || '',
  companies: '',
};
const getters = {
  getDepartments: (state) => state.departments,
  getCompanies: (state) => state.companies,
};
const mutations = {
  changeDepartments(state, payload) {
    state.departments = payload;
    setItem('departments', state.departments);
  },
  changeCompanies(state, payload) {
    state.companies = payload;
  },
};
const actions = {
  async fetchDepartments({ commit }) {
    const response = await corporationApi.fetchDepartments(this.getters.getUser.role);

    if (response) {
      commit('changeDepartments', response.data);
    }
  },

  async fetchCompanies({ commit }, department) {
    const response = await corporationApi.fetchCompanies(department, this.getters.getUser.role);
    if (response) {
      // const filteredCompanies = await removeRedundant(this.state.search.users
      //   .map((i) => i.data.company), response);
      commit('changeCompanies', response);
    }
  },

  clearCompanies({ commit }) {
    commit('changeCompanies', '');
  },

};
export default {
  state,
  getters,
  mutations,
  actions,
};
