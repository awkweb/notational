/* eslint-disable no-shadow */

import api from '@/api';

const SET_USER = 'SET_USER';

const state = {
  user: null,
};
const actions = {
  LOG_IN_USER: ({ commit }, data) =>
    api
      .logIn(data.email, data.password)
      .then(user => commit(SET_USER, user)),
  LOG_OUT_USER: ({ commit }) =>
    api
      .logOut()
      .then(() => commit(SET_USER, null)),
  SIGN_UP_USER: ({ commit }, data) =>
    api
      .signUp(data.email, data.password)
      .then(user => commit(SET_USER, user)),
};
const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  },
};
const getters = {
  user: state => state.user,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
