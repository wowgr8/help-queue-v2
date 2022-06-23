import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import rootReducer from './reducers/index';
import {Provider} from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import "firebase/compat/firestore"
//import { composeWithDevTools } from "redux-devtools-extension"; - from patrick repo, will probably not use here.
import "firebase/compat/auth"

const store = createStore(rootReducer);


store.subscribe(() =>
  console.log(store.getState())
);

const rrfProps = {
  firebase,
  config: {
        userProfile: "users"
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

// NEW NOTE: Since succesful compiling - the bottom comment does not bundle properly. Ignore for now/soon to be deleted comment and note.
// If there are errors at the end of lesson replace lines 29-36 with:
// ReactDOM.render(
//   <Provider store={store}>
//     <ReactReduxFirebaseProvider {...rrfProps}>
//       <App />
//     </ReactReduxFirebaseProvider>
//   </Provider>,
//   document.getElementById('root')
// )


reportWebVitals();
