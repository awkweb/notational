import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import nv from './modules/nv';

Vue.use(Vuex);

export const SET_THEME = 'SET_THEME';
export const SET_QUERY = 'SET_QUERY';
export const SET_RESULT_INDEX = 'SET_RESULT_INDEX';
export const SET_RENAMING_ID = 'SET_RENAMING_ID';
export const SET_EDITING_ID = 'SET_EDITING_ID';

export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';
export const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY';
export const SET_NOTES = 'SET_NOTES';

const store = new Vuex.Store({
  modules: {
    auth,
    nv,
  },
  state: {
    query: '',
    resultIndex: -1,
    renamingId: null,
    editingId: null,
  },
  actions: {
    RESET_ACTIVE_NOTE: ({ commit }) => {
      commit(SET_RESULT_INDEX, -1);
      commit(SET_ACTIVE_NOTE, null);
      commit(SET_ACTIVE_KEY, null);
    },
    RESET_APP: ({ commit }) => {
      commit(SET_THEME, 'light');
      commit(SET_QUERY, '');
      commit(SET_RESULT_INDEX, -1);
      commit(SET_NOTES, []);
      commit(SET_ACTIVE_NOTE, null);
      commit(SET_ACTIVE_KEY, null);
    },
  },
  mutations: {
    [SET_QUERY](state, query) {
      state.query = query;
    },
    [SET_RESULT_INDEX](state, resultIndex) {
      state.resultIndex = resultIndex;
    },
    [SET_RENAMING_ID](state, renamingId) {
      state.renamingId = renamingId;
    },
    [SET_EDITING_ID](state, editingId) {
      state.editingId = editingId;
    },
  },
  getters: {
    query: state => state.query,
    resultIndex: state => state.resultIndex,
    renamingId: state => state.renamingId,
    editingId: state => state.editingId,
  },
});

export default store;
