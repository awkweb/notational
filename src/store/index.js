import Vue from 'vue'
import Vuex from 'vuex'
import { logIn, logOut } from './firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: null,
  },
  
  actions: {
      LOG_IN_USER: ({ commit }, data) => {
        return logIn(data.email, data.password).then(user => commit('SET_USER', user))
      },

      LOG_OUT_USER: ({ commit }) => {
        return logOut().then(user => commit('SET_USER', null))
      },
  },

  mutations: {
      SET_USER: (state, user) => {
        state.user = user
      },
  },

  getters: {
      user: state => {
        return state.user
      },
  }
})

export default store