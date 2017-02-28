import Vue from 'vue'
import Vuex from 'vuex'
import { logIn, logOut, getNotesForUserId } from './firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: null,
      notes: [],
      activeNote: null
  },
  
  actions: {
      LOG_IN_USER: ({ commit }, data) => {
        return logIn(data.email, data.password).then(user => commit('SET_USER', user))
      },

      LOG_OUT_USER: ({ commit }) => {
        return logOut().then(user => commit('SET_USER', null))
      },

      FETCH_NOTES: ({ commit }, userId) => {
        return getNotesForUserId(userId).then(notes => commit('SET_NOTES', notes.val()))
      },
  },

  mutations: {
      SET_USER: (state, user) => {
        state.user = user
      },

      SET_NOTES: (state, notes) => {
        state.notes = notes
      },

      SET_ACTIVE_NOTE: (state, note) => {
        state.activeNote = note
      },
  },

  getters: {
      user: state => {
        return state.user
      },

      notes: state => {
        return state.notes
      },

      activeNote: state => {
        return state.activeNote
      },
  }
})

export default store