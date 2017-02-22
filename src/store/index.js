import Vue from 'vue'
import Vuex from 'vuex'
import { logIn } from './firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      user: null,
  },
  
  actions: {
      FETCH_USER: ({ commit }, data) => {
        return logIn(data.email, data.password).then(user => commit('SET_USER', user))
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