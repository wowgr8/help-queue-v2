import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID 
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;


// NOTE: The above may be outdated. The lessons asked to install a previous version of Firebase to prevent possible bugs while following along with the lessons. I could not install that version so I installed with a current version of Firebase. The 
  // setting in firebase.com recommend I create the configuration file like so (may need to revert to this note):


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDT7x1NiLO4GXujAeT_3qh7LQKTvSuDqXU",
//   authDomain: "redux-help-queue-v2.firebaseapp.com",
//   projectId: "redux-help-queue-v2",
//   storageBucket: "redux-help-queue-v2.appspot.com",
//   messagingSenderId: "658609667628",
//   appId: "1:658609667628:web:a532494e1e7808bb87db89"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);