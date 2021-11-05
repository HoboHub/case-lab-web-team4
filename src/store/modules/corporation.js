/* eslint no-shadow:  0 */ // --> OFF
// eslint-disable-next-line no-unused-vars
import { getItem, removeItem, setItem } from '@/helpers/localStorageHelper';
import corporationApi from '@/services/search/corporationApi';

const state = {
  departments: getItem('departments') || '',
  companies: getItem('companies') || '',
};
const getters = {
  getDepartments: (state) => state.departments,
  getCompanies: (state) => state.companies,
};
const mutations = {
  changeDepartments(state, payload) {
    state.departments = payload;
    setItem('departments', payload);
  },
  changeCompanies(state, payload) {
    state.companies = payload;
    setItem('companies', payload);
  },
};
const actions = {
  async fetchDepartments({ commit }) {
    const response = await corporationApi.fetchDepartments('teacher');

    if (response) {
      commit('changeDepartments', response.data.filter((i) => i));
    }
  },

  async fetchCompanies({ commit }, department) {
    const response = await corporationApi.fetchCompanies(department, 'teacher');
    if (response) {
      commit('changeCompanies', response);
    }
  },

};
export default {
  state,
  getters,
  mutations,
  actions,
};
