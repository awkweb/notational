import _ from 'lodash'

import api from '../api'
import { SET_NOTES, SET_ACTIVE_NOTE, SET_ACTIVE_KEY, UPDATE_NOTE, CREATE_NOTE, DELETE_NOTE } from '../constants'

const state = {
    notes: [],
    activeNote: null,
    activeKey: null
}

const actions = {
    FETCH_NOTES: ({ state, commit, rootState }) => {
      return api.getNotesForUserId(rootState.auth.user.uid)
                .then(notes => commit(SET_NOTES, notes))
    },

    CREATE_NOTE: ({ state, commit, rootState }, note) => {
      return api.createNote(rootState.auth.user.uid, note)
                .then(key => commit(CREATE_NOTE, { key: key, note: note }))
    },

    UPDATE_NOTE: ({ state, commit, rootState }) => {
      return api.updateNote(rootState.auth.user.uid, state.activeKey, state.activeNote)
                .then(res => commit(UPDATE_NOTE, { key: res.key, date_modified: res.date_modified }))
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

    [SET_ACTIVE_KEY] (state, key) {
      state.activeKey = key
    },

    [CREATE_NOTE] (state, data) {
      state.notes[`${data.key}`] = data.note
    },

    [UPDATE_NOTE] (state, data) {
      let note = state.notes[`${data.key}`]
      note.date_modified = data.date_modified
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
