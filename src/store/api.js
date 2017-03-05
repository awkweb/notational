import firebase from 'firebase'
import moment from 'moment'

import '../../settings'

let app = firebase.initializeApp(ENV.firebase)
let auth = app.auth()
let database = app.database()

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

	getNotesForUserId (userId) {
    return new Promise((resolve, reject) => {
      let notesRef = database.ref(`${userId}/notes`)
      return notesRef.once('value')
                     .then(res => resolve(res.val()))
    })
	},

	createNote (userId, note) {
		return new Promise((resolve, reject) => {
      let userNotesRef = database.ref(`${userId}/notes`)
      return userNotesRef.push(note)
                         .then(res => resolve(res.key))
    })
	},

  updateNote (userId, key, note) {
    return new Promise((resolve, reject) => {
      let notesRef = database.ref(`${userId}/notes/${key}`)
      const dateModified = moment().toString()
      return notesRef.update({        
                        title: note.title,
                        body: note.body,
                        date_modified: dateModified,
                      })
                      .then(res => resolve({ key: key, date_modified: dateModified }))
    })
  },

  deleteNote (userId, key) {
    let notesRef = database.ref(`${userId}/notes/${key}`)
    return notesRef.remove()
  }
}
