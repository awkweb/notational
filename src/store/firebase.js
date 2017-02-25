const config = {
    apiKey: "AIzaSyAEw8F_DtEPeg8eIipPqT7RkQft6fKlEOo",
    authDomain: "notational-velocity.firebaseapp.com",
    databaseURL: "https://notational-velocity.firebaseio.com",
    storageBucket: "notational-velocity.appspot.com",
    messagingSenderId: "162577157920"
}
let app = firebase.initializeApp(config)
let database = app.database()

export function logIn (email, password) {
    return app.auth().signInWithEmailAndPassword(email, password)
}

export function logOut () {
    return app.auth().signOut()
}

export function getNotesForUserId (userId) {
	return database.ref(`${userId}/notes`).once('value')
}