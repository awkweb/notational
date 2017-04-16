import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import nv from './modules/nv'
import { getNotesForUserId } from './api'
import { SET_ACTIVE_NOTE,
         SET_ACTIVE_KEY,
         SET_QUERY,
         SET_NOTES,
         SET_RESULT_INDEX,
         SET_RENAMING_ID,
         SET_EDITING_ID } from './constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    query: '',
    resultIndex: -1,
    renamingId: null,
    editingId: null
  },

  modules: {
    auth,
    nv
  },

  actions: {
    RESET_ACTIVE_NOTE: ({ state, commit, rootState }) => {
      commit(SET_RESULT_INDEX, -1)
      commit(SET_ACTIVE_NOTE, null)
      commit(SET_ACTIVE_KEY, null)
    },

    RESET_APP: ({ state, commit, rootState }) => {
      commit(SET_QUERY, '')
      commit(SET_RESULT_INDEX, -1)
      commit(SET_NOTES, [])
      commit(SET_ACTIVE_NOTE, null)
      commit(SET_ACTIVE_KEY, null)
    },
  },

  mutations: {
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
