import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer, { USER_DOMAIN } from './user';
import PostReducer, { POSTS_DOMAIN } from './posts';


const rootReducer = combineReducers({
  [USER_DOMAIN]: UserReducer,
  [POSTS_DOMAIN]: PostReducer,
});
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk,
));

export default store;
