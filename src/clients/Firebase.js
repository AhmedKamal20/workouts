import React from 'react';

import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Workout API ***

  workout = woid => this.db.ref(`workouts/${woid}`);

  workouts = () => this.db.ref('workouts');

  // *** Routine API ***

  routine = rid => this.db.ref(`routines/${rid}`);

  routines = () => this.db.ref('routines');
}

const FirebaseContext = React.createContext(null);

export default Firebase;
export { FirebaseContext };
