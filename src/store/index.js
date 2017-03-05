import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import notes from './modules/notes'
import { getNotesForUserId } from './api'
import { SET_QUERY, SET_RESULT_INDEX, SET_EDITING_ID } from './constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    query: '',
    resultIndex: -1,
    editingId: null,
  },

  modules: {
    auth,
    notes
  },

  mutations: {
    [SET_QUERY] (state, query) {
      state.query = query
    },

    [SET_RESULT_INDEX] (state, resultIndex) {
      state.resultIndex = resultIndex
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

    editingId: state => {
      return state.editingId
    }
  }
})

export default store
