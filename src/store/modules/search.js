/* eslint no-shadow:  0 */ // --> OFF
// eslint-disable-next-line no-unused-vars
import searchApi from '@/services/search/searchApi';

const state = {
  users: '',
  isLoading: false,
  courses: '',
  events: '',
};
const getters = {
  getUsers: (state) => state.users,
  getLoadingStatus: (state) => state.isLoading,
  getCourses: (state) => state.courses,
  getEvents: (state) => state.events,
};

const mutations = {
  // eslint-disable-next-line no-shadow
  changeUsers(state, payload) {
    state.users = payload;
  },
  changeLoadingStatus(state, payload) {
    state.isLoading = payload;
  },
  changeCourses(state, payload) {
    state.courses = payload;
  },
  changeEvents(state, payload) {
    state.events = payload;
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
  // eslint-disable-next-line no-unused-vars
  async fetchCourses({ commit }, q) {
    commit('changeLoadingStatus', true);

    const response = await searchApi.getCourses(q, 'teacher');
    if (response) {
      commit('changeCourses', response);
    }
    commit('changeLoadingStatus', false);
  },
  async fetchEvents({ commit }, q) {
    const response = await searchApi.getEvents(q, 'teacher');
    if (response) {
      commit('changeEvents', response);
    }
  },

  clearUsers({ commit }) {
    commit('changeUsers', '');
  },

  clearCourses({ commit }) {
    commit('changeCourses', '');
  },

  clearEvents({ commit }) {
    commit('changeEvents', '');
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
