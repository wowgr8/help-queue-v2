import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import reducer from './reducers/ticket-list-reducer';
import {Provider} from 'react-redux';
// the <Provider> component will give all of its child components access to the connect() function, which is needed to connect to the Redux store.
const store = createStore(reducer);

// Our <App /> component is now a child of the <Provider> component. We've also passed the Redux store in as a prop to <Provider> as well.
// We won't need to explicitly pass store as a prop through the other components in our tree - it's already being inherited by <App /> and all of its children by way of the <Provider> component.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
