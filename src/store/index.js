import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import notes from './modules/notes'
import { getNotesForUserId } from './firebase'
import { SET_QUERY } from './constants'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    query: ''
  },

  modules: {
    auth,
    notes
  },

  mutations: {
    [SET_QUERY] (state, query) {
      state.query = query
    }
  },

  getters: {
    query: state => {
      return state.query
    }
  }
})

export default store
