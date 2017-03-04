import ls from 'local-storage'

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

    ls_pushNote (note) {
      const notes = ls_pullNotes().push(note)
      ls_pushNotes(notes)
    },

    ls_removeNote (noteId) {
      const notes = ls_pullNotes().filter(note => note.id != noteId)
      ls_pushNotes(notes)
    }
  }
}