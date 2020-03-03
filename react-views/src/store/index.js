import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({ AuthReducer });
const store = createStore(rootReducer, applyMiddleware(
  ReduxThunk
));

export default store;
