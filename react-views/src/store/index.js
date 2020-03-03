import { combineReducers, createStore, applyMiddleware } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({ AuthReducer });
const store = createStore(rootReducer, applyMiddleware(
  ThunkMiddleware,
));

export default store;
