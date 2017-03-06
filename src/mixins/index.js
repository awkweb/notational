import ls from 'local-storage'
import moment from 'moment'
import _ from 'lodash'
import 'string_score'

export const localStorageMixin = {
  methods: {
    ls_pushUser (user) {
      ls.set('user', user)
    },

    ls_pullUser () {
      return ls.get('user')
    },

    ls_logOut () {
      return ls.clear()
    }
  }
}


export const noteMixin = {
  methods: {
    createNote (id, title, body = '', dateModified = moment()) {
      return  {
        id: id,
        title: title,
        body: body,
        date_modified: dateModified.toString(),
        date_created: moment().toString()
      }
    },

    findKeyForNoteId (noteId, notes) {
      return _.findKey(notes, { 'id': noteId })
    },

    nextIdForNotes (notes) {
      const ids = _.map(notes, (note) => { return note.id });
      return ids.length > 0 ? Math.max(...ids) + 1 : 1
    },

    filterNotesForQuery (query, notes) {
      return _.filter(notes, (note) => {
        const titleScore = note.title.score(query)
        const bodyScore = note.body.score(query)
        note.score = 1 - titleScore + bodyScore
        return titleScore > 0 || bodyScore > 0
      })
    },

    sortNotes (notes, useScore) {
      let now = moment()
      if (useScore)
        return _.sortBy(notes, ['score', (note) => this.secondsFromNow(now, note.date_modified)])
      else
        return _.sortBy(notes, [(note) => this.secondsFromNow(now, note.date_modified)])
    },

    secondsFromNow (now, dateString) {
      const date = moment(dateString)
      return now.diff(date, 'seconds')
    }
  }
}


export const utilsMixin = {
  methods: {
    selectElement (selector) {
      return document.querySelector(`${selector}`)
    },

    focusElement (selector) {
      const element = this.selectElement(selector)
      element.focus()
    }
  }
}