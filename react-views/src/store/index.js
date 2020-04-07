import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './user';
import PostReducer from './posts';
import { USER_DOMAIN, POSTS_DOMAIN } from '../constants';


const rootReducer = combineReducers({
  [USER_DOMAIN]: UserReducer,
  [POSTS_DOMAIN]: PostReducer,
});
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk,
));

export default store;
