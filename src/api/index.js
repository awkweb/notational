import firebase from 'firebase';
import moment from 'moment';
import _ from 'lodash';

firebase.initializeApp({
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  databaseURL: process.env.firebase.databaseUrl,
  projectId: process.env.firebase.projectId,
});
const auth = firebase.auth();
const db = firebase.database();

export default {
  logIn: (email, password) =>
    auth.signInWithEmailAndPassword(email, password),
  logOut: () =>
    auth.signOut(),
  signUp: (email, password) =>
    auth.createUserWithEmailAndPassword(email, password),
  initNotesForUserId: userId =>
    new Promise(resolve =>
      this
        .getDefaultNotes()
        .then((notes) => {
          const dateModified = moment().toString();
          _.forEach(notes, (note) => {
            note.date_modified = dateModified; // eslint-disable-line
            note.date_created = dateModified; // eslint-disable-line
            this.createNote(userId, note);
          });
          this.updateTheme(userId, 'light');
          resolve(true);
        })),
  getDefaultNotes: () =>
    new Promise(resolve =>
      db
        .ref('default_notes/notes')
        .once('value')
        .then(res => resolve(res.val())),
    ),
  getDataForUserId: userId =>
    new Promise((resolve) => {
      const userRef = db.ref(`users/${userId}`);
      return userRef
        .once('value')
        .then(res => resolve(res.val()));
    }),
  getPreviewData: () =>
    new Promise(resolve =>
      db
        .ref('default_notes/notes')
        .once('value')
        .then((res) => {
          const notes = {};
          const dateModified = moment().subtract(1, 'minute').toString();
          res.val().forEach((note) => {
            note.date_modified = dateModified; // eslint-disable-line
            notes[note.id] = note;
          });
          resolve({
            notes,
            theme: 'light',
          });
        }),
    ),
  createNote: (userId, note) =>
    new Promise(resolve =>
      db
        .ref(`users/${userId}/notes`)
        .push(note)
        .then(res => resolve(res.key)),
    ),
  updateNote: (userId, key, note) =>
    new Promise((resolve) => {
      const notesRef = db.ref(`users/${userId}/notes/${key}`);
      const dateModified = moment().toString();
      return notesRef
        .update({
          name: note.name,
          body: note.body,
          date_modified: dateModified,
        })
        .then(() => resolve({
          key,
          date_modified: dateModified,
        }));
    }),
  deleteNote: (userId, key) =>
    db
      .ref(`users/${userId}/notes/${key}`)
      .remove(),
  updateTheme: (userId, theme) =>
    new Promise(resolve =>
      db
        .ref(`users/${userId}`)
        .update({ theme })
        .then(() => resolve(theme)),
    ),
  getPublicNoteForId: noteId =>
    new Promise((resolve, reject) =>
      db
        .ref(`public_notes/${noteId}`)
        .on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            db
              .ref(`users/${data.user_id}/notes/${data.note_id}`)
              .on('value', snapshot2 => resolve(snapshot2.val()));
          } else {
            reject('Nothing here.');
          }
        }),
    ),
  toggleIsPublic: (userId, key, note) => {
    const isPublic = !note.is_public;
    return new Promise(resolve =>
      db
        .ref(`users/${userId}/notes/${key}`)
        .update({
          is_public: isPublic,
        })
        .then(() => {
          const publicNoteRef = db.ref(`public_notes/${key}`);
          if (isPublic) {
            publicNoteRef.set({
              user_id: userId,
              note_id: key,
            });
          } else {
            publicNoteRef.remove();
          }
          resolve({
            key,
            is_public: isPublic,
          });
        }));
  },
};
