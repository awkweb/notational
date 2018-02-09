import ls from 'local-storage';
import moment from 'moment';
import _ from 'lodash';
import 'string_score';

export const localStorageMixin = {
  methods: {
    ls_pushUser(user) {
      ls.set('user', user);
    },
    ls_pullUser() {
      return ls.get('user');
    },
    ls_logOut() {
      return ls.clear();
    },
  },
};

export const noteMixin = {
  methods: {
    createNote(id, name, body = '', dateModified = moment()) {
      return {
        id,
        name,
        body,
        date_modified: dateModified.toString(),
        date_created: moment().toString(),
        is_public: false,
      };
    },
    findKeyForNoteId(noteId, notes) {
      return _.findKey(notes, { id: noteId });
    },
    nextIdForNotes(notes) {
      const ids = _.map(notes, note => note.id);
      return ids.length > 0 ? Math.max(...ids) + 1 : 1;
    },
    filterNotesForQuery(query, notes) {
      return _.filter(notes, (note) => {
        const queryLower = query.toLowerCase();
        const nameScore = note.name.toLowerCase().score(queryLower);
        const bodyScore = note.body.toLowerCase().score(queryLower);
        note.score = nameScore + bodyScore; // eslint-disable-line
        return nameScore > 0 || bodyScore > 0;
      });
    },
    sortNotes(notes, useScore) {
      const now = moment();
      if (useScore) {
        return _.orderBy(notes, ['score', note => this.secondsFromNow(now, note.date_modified)], ['desc', 'asc']);
      } else { // eslint-disable-line
        return _.orderBy(notes, [note => this.secondsFromNow(now, note.date_modified)], ['asc']);
      }
    },
    secondsFromNow(now, dateString) {
      const date = moment(dateString);
      return now.diff(date, 'seconds');
    },
  },
};

export const utilsMixin = {
  methods: {
    selectElement(selector) {
      return document.querySelector(`${selector}`);
    },
    focusElement(selector) {
      const element = this.selectElement(selector);
      element.focus();
    },
  },
};
