import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
<<<<<<< HEAD
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
<<<<<<< HEAD
=======
>>>>>>> cf908c1... set up redux store
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 4054e8b... add react-bootstrap and design home page
=======
>>>>>>> b7879d0... bootstrap login and signup page

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
