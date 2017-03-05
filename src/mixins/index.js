import ls from 'local-storage'
import moment from 'moment'
import _ from 'lodash'
import 'string_score'

export const localStorageMixin = {
  methods: {
    // USER
    ls_pushUser (user) {
      ls.set('user', user)
    },

    ls_pullUser () {
      return ls.get('user')
    },

    ls_attachListener (callback) {
      ls.on('user', callback)
    },

    ls_logOut () {
      return ls.clear()
    },

    // NOTES
    ls_pushNotes (notes) {
      ls.set('notes', notes)
    },

    ls_pullNotes () {
      return ls.get('notes')
    },

    ls_updateNote (note) {
      this.ls_removeNote(note.id)
      this.ls_pushNote(note)
    },

    ls_pushNote (note) {
      let notes = this.ls_pullNotes()
      notes.push(note)
      this.ls_pushNotes(notes)
    },

    ls_removeNote (noteId) {
      let notes = this.ls_pullNotes()
      notes = notes.filter(note => note.id != noteId)
      this.ls_pushNotes(notes)
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
        date_modified: dateModified,
        date_created: moment()
      }
    },

    filterNotesForQuery (query, notes) {
      return notes.filter(note => { return note.title.score(query) > 0 || note.body.score(query) > 0 })
    },

    sortNotes (notes) {
      let now = moment()
      return _.sortBy(notes, [function (note) {
        const date = moment(note.date_modified)
        return now.diff(date, 'seconds')
      }])
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
