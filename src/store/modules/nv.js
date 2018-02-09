/* eslint-disable no-shadow */

import Vue from 'vue';
import moment from 'moment';
import api from '@/api';

export const SET_NOTES = 'SET_NOTES';
export const SET_ACTIVE_NOTE = 'SET_ACTIVE_NOTE';
export const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY';
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const TOGGLE_IS_PUBLIC = 'TOGGLE_IS_PUBLIC';

export const SET_THEME = 'SET_THEME';
export const SET_RESULT_INDEX = 'SET_RESULT_INDEX';

const state = {
  theme: 'light',
  notes: [],
  activeNote: null,
  activeKey: null,
};

const actions = {
  INIT_NOTES: ({ rootState }) => api.initNotesForUserId(rootState.auth.user.uid),
  FETCH_USER_DATA: ({ commit, rootState }) =>
    api
      .getDataForUserId(rootState.auth.user.uid)
      .then((res) => {
        commit(SET_NOTES, res.notes);
        commit(SET_THEME, res.theme);
      }),
  FETCH_PREVIEW_DATA: ({ commit }) =>
    api
      .getPreviewData()
      .then((res) => {
        commit(SET_NOTES, res.notes);
        commit(SET_THEME, res.theme);
      }),
  // eslint-disable-next-line consistent-return
  CREATE_NOTE: ({ commit, rootState }, note) => {
    if (rootState.auth.user) {
      return api
        .createNote(rootState.auth.user.uid, note)
        .then((key) => {
          commit(SET_RESULT_INDEX, 0);
          commit(CREATE_NOTE, { key, note });
        });
    // eslint-disable-next-line no-else-return
    } else {
      // TODO: This seems unnecessary as it's just for creating the initial notes I think
      commit(SET_RESULT_INDEX, 0);
      commit(CREATE_NOTE, { key: note.id, note });
    }
  },
  // eslint-disable-next-line consistent-return
  UPDATE_NOTE: ({ commit, rootState }) => {
    if (rootState.auth.user) {
      return api
        .updateNote(rootState.auth.user.uid, state.activeKey, state.activeNote)
        .then(res => commit(UPDATE_NOTE, { key: res.key, date_modified: res.date_modified }));
    // eslint-disable-next-line no-else-return
    } else {
      const dateModified = moment().toString();
      commit(UPDATE_NOTE, { key: state.activeKey, date_modified: dateModified });
    }
  },
  // eslint-disable-next-line consistent-return
  DELETE_NOTE: ({ commit, rootState }) => {
    if (rootState.auth.user) {
      return api
        .deleteNote(rootState.auth.user.uid, state.activeKey)
        .then(() => commit(DELETE_NOTE, state.activeKey));
    // eslint-disable-next-line no-else-return
    } else {
      commit(DELETE_NOTE, state.activeKey);
    }
  },
  // eslint-disable-next-line consistent-return
  UPDATE_THEME: ({ commit, rootState }, theme) => {
    if (rootState.auth.user) {
      return api
        .updateTheme(rootState.auth.user.uid, theme)
        .then(theme2 => commit(SET_THEME, theme2));
    // eslint-disable-next-line no-else-return
    } else {
      commit(SET_THEME, theme);
    }
  },
  // eslint-disable-next-line consistent-return
  TOGGLE_IS_PUBLIC: ({ commit, rootState }, note) =>
    api
      .toggleIsPublic(rootState.auth.user.uid, state.activeKey, note)
      .then(res => commit(TOGGLE_IS_PUBLIC, { key: res.key, is_public: res.is_public })),
  FETCH_PUBLIC_NOTE_FOR_ID: ({ commit }, noteId) =>
    api
      .getPublicNoteForId(noteId)
      .then(note => commit(SET_ACTIVE_NOTE, note)),
};

const mutations = {
  [SET_THEME](state, theme) {
    state.theme = theme;
  },
  [SET_NOTES](state, notes) {
    state.notes = notes;
  },
  [SET_ACTIVE_NOTE](state, note) {
    state.activeNote = note;
  },
  [SET_ACTIVE_KEY](state, key) {
    state.activeKey = key;
  },
  [CREATE_NOTE](state, data) {
    Vue.set(state.notes, data.key, data.note);
    state.activeKey = data.key;
    state.activeNote = data.note;
  },
  [UPDATE_NOTE](state, data) {
    const note = state.notes[`${data.key}`];
    note.date_modified = data.date_modified;
  },
  [DELETE_NOTE](state, key) {
    Vue.delete(state.notes, key);
  },
  [TOGGLE_IS_PUBLIC](state, data) {
    const note = state.notes[`${data.key}`];
    note.is_public = data.is_public;
  },
};

const getters = {
  theme: state => state.theme,
  notes: state => state.notes,
  activeNote: state => state.activeNote,
  activeKey: state => state.activeKey,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
