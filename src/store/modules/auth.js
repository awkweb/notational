import api from '../api'
import { SET_USER } from '../constants'

const state = {
  user: null
}

const actions = {
  LOG_IN_USER: ({ commit }, data) => {
    return api.logIn(data.email, data.password)
              .then(user => commit(SET_USER, user))
  },

  LOG_OUT_USER: ({ state, commit }) => {
    return api.logOut()
              .then(() => commit(SET_USER, null))
  },

  SIGN_UP_USER: ({ commit }, data) => {
    return api.signUp(data.email, data.password)
              .then(user => commit(SET_USER, user))
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
  }
}

const getters = {
  user: state => {
    return state.user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
