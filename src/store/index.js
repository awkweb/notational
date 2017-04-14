import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import nv from './modules/nv'
import { getNotesForUserId } from './api'
import { SET_THEME,
         SET_QUERY,
         SET_RESULT_INDEX,
         SET_RENAMING_ID,
         SET_EDITING_ID } from './constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    theme: 'night',
    query: '',
    resultIndex: -1,
    renamingId: null,
    editingId: null
  },

  modules: {
    auth,
    nv
  },

  mutations: {
    [SET_THEME] (state, theme) {
      state.theme = theme
    },

    [SET_QUERY] (state, query) {
      state.query = query
    },

    [SET_RESULT_INDEX] (state, resultIndex) {
      state.resultIndex = resultIndex
    },

    [SET_RENAMING_ID] (state, renamingId) {
      state.renamingId = renamingId
    },

    [SET_EDITING_ID] (state, editingId) {
      state.editingId = editingId
    }
  },

  getters: {
    theme: state => {
      return state.theme
    },

    query: state => {
      return state.query
    },

    resultIndex: state => {
      return state.resultIndex
    },

    renamingId: state => {
      return state.renamingId
    },

    editingId: state => {
      return state.editingId
    }
  }
})

export default store
