import firebase from 'firebase'
import _ from 'lodash'
import moment from 'moment'

import '../../settings'

let app = firebase.initializeApp(ENV.firebase)
let auth = app.auth()
let database = app.database()

export default {
	logIn (email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	},

  logInAnonymously () {
    return auth.signInAnonymously()
  },

	logOut () {
		return auth.signOut()
	},

	signUp (email, password) {
		return auth.createUserWithEmailAndPassword(email, password)
	},

  signUpAnonymously (email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return auth.currentUser.link(credential)
  },

  deleteAnonymousUser (userId) {
    let userRef = database.ref(`users/${userId}`)
    userRef.remove()
    return auth.currentUser.delete()
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
      let notesRef = database.ref('default_notes/notes')
      return notesRef.once('value')
                     .then(res => resolve(res.val()))
    })
  },

	getNotesForUserId (userId) {
    return new Promise((resolve, reject) => {
      let notesRef = database.ref(`users/${userId}/notes`)
      return notesRef.once('value')
                     .then(res => resolve(res.val()))
    })
	},

	createNote (userId, note) {
		return new Promise((resolve, reject) => {
      let userNotesRef = database.ref(`users/${userId}/notes`)
      return userNotesRef.push(note)
                         .then(res => resolve(res.key))
    })
	},

  updateNote (userId, key, note) {
    return new Promise((resolve, reject) => {
      let notesRef = database.ref(`users/${userId}/notes/${key}`)
      const dateModified = moment().toString()
      return notesRef.update({        
                        name: note.name,
                        body: note.body,
                        date_modified: dateModified,
                      })
                      .then(res => resolve({ key: key, date_modified: dateModified }))
    })
  },

  deleteNote (userId, key) {
    let notesRef = database.ref(`users/${userId}/notes/${key}`)
    return notesRef.remove()
  }
}
