import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './UserReducer';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  posts: PostReducer,
});
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk,
));

export default store;
