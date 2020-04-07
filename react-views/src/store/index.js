import { combineReducers, createStore, applyMiddleware } from 'redux';
<<<<<<< HEAD
<<<<<<< HEAD
import ReduxThunk from 'redux-thunk';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import UserReducer from './user';
import PostReducer from './posts';
import { USER_DOMAIN, POSTS_DOMAIN } from '../constants';


const rootReducer = combineReducers({
  [USER_DOMAIN]: UserReducer,
  [POSTS_DOMAIN]: PostReducer,
});
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk,
=======
import { ThunkMiddleware } from 'redux-thunk';
=======
import ReduxThunk from 'redux-thunk';
>>>>>>> 87d4ec1... prototype some auth actions
import AuthReducer from './AuthReducer';
=======
import UserReducer from './UserReducer';
<<<<<<< HEAD
>>>>>>> 7ed352e... Restructure and add containers(route guards)
=======
import PostReducer from './PostReducer';
>>>>>>> d9e8725... Temp: add user profile and get posts feat.
=======
import UserReducer, { USER_DOMAIN } from './user';
import PostReducer, { POSTS_DOMAIN } from './posts';
=======
import UserReducer from './user';
import PostReducer from './posts';
import { USER_DOMAIN, POSTS_DOMAIN } from '../constants';
>>>>>>> cf60350... Refactor redux code to microservice structure

>>>>>>> 5415bdb... restructure redux store

const rootReducer = combineReducers({
  [USER_DOMAIN]: UserReducer,
  [POSTS_DOMAIN]: PostReducer,
});
const store = createStore(rootReducer, applyMiddleware(
<<<<<<< HEAD
<<<<<<< HEAD
  ThunkMiddleware,
>>>>>>> cf908c1... set up redux store
=======
  ReduxThunk
>>>>>>> 87d4ec1... prototype some auth actions
=======
  ReduxThunk,
>>>>>>> 7ed352e... Restructure and add containers(route guards)
));

export default store;
