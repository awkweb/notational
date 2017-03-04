import { logIn, logOut, signUp } from '../firebase'
import { SET_USER } from '../constants'

const state = {
  user: null
}

const actions = {
  LOG_IN_USER: ({ commit }, data) => {
    return logIn(data.email, data.password).then(user => commit(SET_USER, user))
  },

  LOG_OUT_USER: ({ commit }) => {
    return logOut().then(user => commit(SET_USER, null))
  },

  SIGN_UP_USER: ({ commit }, data) => {
    return signUp(data.email, data.password).then(user => commit(SET_USER, user))
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
