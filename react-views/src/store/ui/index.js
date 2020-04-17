import { combineReducers } from 'redux';
import PopupReducer from './popups';
import { POPUPS_DOMAIN } from '../../constants';

const UIReducer = combineReducers({
  [POPUPS_DOMAIN]: PopupReducer,
});

export default UIReducer;
