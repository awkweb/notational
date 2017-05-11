import Vue from 'vue'

import api from '../api'
import {
  SET_RESULT_INDEX,
  SET_THEME,
  SET_NOTES,
  SET_ACTIVE_NOTE,
  SET_ACTIVE_KEY,
  UPDATE_NOTE,
  CREATE_NOTE,
  DELETE_NOTE,
  TOGGLE_IS_PUBLIC } from '../constants'

const state = {
    theme: 'light',
    notes: [],
    activeNote: null,
    activeKey: null
}

const actions = {
    INIT_NOTES: ({ state, commit, rootState }) => {
      return api.initNotesForUserId(rootState.auth.user.uid)
    },

    FETCH_USER_DATA: ({ state, commit, rootState }) => {
      return api.getDataForUserId(rootState.auth.user.uid)
                .then((res) => {
                  commit(SET_NOTES, res.notes)
                  commit(SET_THEME, res.theme)
                })
    },

    FETCH_PREVIEW_DATA: ({ state, commit, rootState }) => {
      return api.getPreviewData()
                .then((res) => {
                  commit(SET_NOTES, res.notes)
                  commit(SET_THEME, res.theme)
                })
    },

    CREATE_NOTE: ({ state, commit, rootState }, note) => {
      return api.createNote(rootState.auth.user.uid, note)
                .then((key) => {
                  commit(SET_RESULT_INDEX, 0)
                  commit(CREATE_NOTE, { key: key, note: note })
                })
    },

    UPDATE_NOTE: ({ state, commit, rootState }) => {
      return api.updateNote(rootState.auth.user.uid, state.activeKey, state.activeNote)
                .then((res) => commit(UPDATE_NOTE, { key: res.key, date_modified: res.date_modified }))
    },

    DELETE_NOTE: ({ state, commit, rootState }) => {
      return api.deleteNote(rootState.auth.user.uid, state.activeKey)
                .then(() => {commit(DELETE_NOTE, state.activeKey)})
    },

    UPDATE_THEME: ({ state, commit, rootState }, theme) => {
      return api.updateTheme(rootState.auth.user.uid, theme)
                .then((theme) => commit(SET_THEME, theme))
    },

    TOGGLE_IS_PUBLIC: ({ state, commit, rootState }, note) => {
      return api.toggleIsPublic(rootState.auth.user.uid, state.activeKey, note)
                .then((res) => commit(TOGGLE_IS_PUBLIC, { key: res.key, is_public: res.is_public }))
    },

    FETCH_PUBLIC_NOTE_FOR_ID: ({ state, commit, rootState }, noteId) => {
      return api.getPublicNoteForId(noteId)
                .then((note) => commit(SET_ACTIVE_NOTE, note))
    }
}

const mutations = {
    [SET_THEME] (state, theme) {
      state.theme = theme
    },

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
      Vue.set(state.notes, data.key, data.note)
      state.activeKey = data.key
      state.activeNote = data.note
    },

    [UPDATE_NOTE] (state, data) {
      let note = state.notes[`${data.key}`]
      note.date_modified = data.date_modified
    },

    [DELETE_NOTE] (state, key) {
      Vue.delete(state.notes, key)
    },

    [TOGGLE_IS_PUBLIC] (state, data) {
      let note = state.notes[`${data.key}`]
      note.is_public = data.is_public 
    }
}

const getters = {
    theme: state => {
      return state.theme
    },

    notes: state => {
      return state.notes
    },

    activeNote: state => {
      return state.activeNote
    },

    activeKey: state => {
      return state.activeKey
    }
}

export default {
  state,
  actions,
  mutations,
  getters
}
