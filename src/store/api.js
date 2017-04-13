import firebase from 'firebase'
import _ from 'lodash'
import moment from 'moment'

import '../../settings'

const app = firebase.initializeApp(ENV.firebase)
const auth = app.auth()
const database = app.database()

export default {
	logIn (email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	},

	logOut () {
		return auth.signOut()
	},

	signUp (email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	},

  initNotesForUserId (userId) {
    const vm = this
    return new Promise((resolve, reject) => {
      return this.getDefaultNotes()
                .then(notes => {
                  const dateModified = moment().toString()
                  _.forEach(notes, function(note, key) {
                    note.date_modified = dateModified
                    note.date_created = dateModified
                    vm.createNote(userId, note)
                  })
                  resolve(true)
                })
    })
  },

  getDefaultNotes () {
    return new Promise((resolve, reject) => {
      const notesRef = database.ref('default_notes/notes')
      return notesRef.once('value')
                     .then(res => resolve(res.val()))
    })
  },

	getNotesForUserId (userId) {
    return new Promise((resolve, reject) => {
      const notesRef = database.ref(`users/${userId}/notes`)
      return notesRef.once('value')
                     .then(res => resolve(res.val()))
    })
	},

	createNote (userId, note) {
		return new Promise((resolve, reject) => {
      const userNotesRef = database.ref(`users/${userId}/notes`)
      return userNotesRef.push(note)
                         .then(res => resolve(res.key))
    })
	},

  updateNote (userId, key, note) {
    return new Promise((resolve, reject) => {
      const notesRef = database.ref(`users/${userId}/notes/${key}`)
      const dateModified = moment().toString()
      return notesRef.update({        
                        name: note.name,
                        body: note.body,
                        date_modified: dateModified
                      })
                      .then(res => resolve({ key: key, date_modified: dateModified }))
    })
  },

  deleteNote (userId, key) {
    const notesRef = database.ref(`users/${userId}/notes/${key}`)
    return notesRef.remove()
  },

  getPublicNoteForId (noteId) {
    return new Promise((resolve, reject) => {
      const noteRef = database.ref(`public_notes/${noteId}`)
      return noteRef.once('value')
                    .then(res => {
                      const data = res.val()
                      if (data) {
                        const notesRef = database.ref(`users/${data.user_id}/notes/${data.note_id}`)
                        notesRef.once('value').then(res => resolve(res.val()))
                      } else {
                        reject('Nothing there')
                      }
                    })
    })
  },

  toggleIsPublic (userId, key, note) {
    const is_public = !note.is_public
    return new Promise((resolve, reject) => {
      const notesRef = database.ref(`users/${userId}/notes/${key}`)
      return notesRef.update({
                        is_public: is_public,
                     })
                     .then(res => {
                        const publicNoteRef = database.ref(`public_notes/${key}`)
                        if (is_public) {
                          publicNoteRef.set({
                                          user_id: userId,
                                          note_id: key
                                        })
                        } else {
                          publicNoteRef.remove()
                        }
                        resolve({ key: key, is_public: is_public })
                     })
    })
  }
}
