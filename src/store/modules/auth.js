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

  LOG_IN_USER_ANONYMOUSLY: ({ commit }) => {
    return api.logInAnonymously()
              .then(user => commit(SET_USER, user))
  },

  LOG_OUT_USER: ({ state, commit, rootState }) => {
    return api.logOut()
              .then(() => commit(SET_USER, null))
  },

  SIGN_UP_USER: ({ commit }, data) => {
    return api.signUp(data.email, data.password)
              .then(user => commit(SET_USER, user))
  },

  SIGN_UP_USER_ANONYMOUSLY: ({ commit }, data) => {
    return api.signUpAnonymously(data.email, data.password)
              .then(user => commit(SET_USER, user))
  },

  DELETE_ANONYMOUS_USER: ({ commit }) => {
    return api.deleteAnonymousUser(state.user.uid)
              .then(() => commit(SET_USER, null))
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
