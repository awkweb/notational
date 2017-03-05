import _ from 'lodash'
import moment from 'moment'

import { getNotesForUserId } from '../firebase'
import { SET_NOTES, SET_ACTIVE_NOTE, UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE } from '../constants'

const state = {
    notes: [],
    activeNote: null
}

const actions = {
    FETCH_NOTES: ({ commit }, userId) => {
      return getNotesForUserId(userId).then(notes => commit(SET_NOTES, notes.val()))
    },

    CREATE_NOTE: ({ commit }, data) => {
      return commit(CREATE_NOTE, data)
    },

    UPDATE_NOTE: ({ commit }, data) => {
      return commit(UPDATE_NOTE, data)
    },

    DELETE_NOTE: ({ commit }, noteId) => {
      return commit(DELETE_NOTE, noteId)
    }
}

const mutations = {
    [SET_NOTES] (state, notes) {
      state.notes = notes
    },

    [SET_ACTIVE_NOTE] (state, note) {
      state.activeNote = note
    },

    [CREATE_NOTE] (state, note) {
      state.notes.splice(0, 0, note)
    },

    [UPDATE_NOTE] (state, updatedNode) {
      let note = _.find(state.notes, { 'id': updatedNode.id })
      note.title = updatedNode.title
      note.body = updatedNode.body
      note.date_modified = moment()
    },

    [DELETE_NOTE] (state, noteId) {
      state.notes = state.notes.filter(note => note.id != noteId)
    }
}

const getters = {
    notes: state => {
      return state.notes
    },

    activeNote: state => {
      return state.activeNote
    }
}

export default {
  state,
  actions,
  mutations,
  getters
}
