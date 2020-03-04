import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({ user: UserReducer });
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk,
));

export default store;
