import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore'; // removed because This is being handled in the rrfProps function in index.js

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

firebase.initializeApp(firebaseConfig);
//firebase.firestore();   This is being handled in the rrfProps function in index.js

export default firebase;




// NOTE: The above may be outdated. The lessons asked to install a previous version of Firebase to prevent possible bugs while following along with the lessons. I could not install that version so I installed with a current version of Firebase. The 
  // setting in firebase.com recommend I create the configuration file like so (may need to revert to this note):

  // NEW NOTE: Used firebase.com's recommended config reference with minor adjustment. Changed app to firebase so that it works with production index.js 


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID 
// };

// // Initialize Firebase (NEW NOTE: This was originally const app = ...... & export default app - I changed app to firebase to work with production index.js properly)
// const firebase = initializeApp(firebaseConfig);

// export default firebase;