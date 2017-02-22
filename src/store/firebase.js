var config = {
    apiKey: "AIzaSyAEw8F_DtEPeg8eIipPqT7RkQft6fKlEOo",
    authDomain: "notational-velocity.firebaseapp.com",
    databaseURL: "https://notational-velocity.firebaseio.com",
    storageBucket: "notational-velocity.appspot.com",
    messagingSenderId: "162577157920"
}
firebase.initializeApp(config)

export function logIn (email, password) {
	console.log(email, password)
    return firebase.auth().signInWithEmailAndPassword(email, password)
}