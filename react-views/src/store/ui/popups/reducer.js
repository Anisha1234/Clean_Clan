import {
  UI_DOMAIN, POPUPS_DOMAIN,
  ADD, REMOVE, RESET,
} from '../../../constants';
import {
  getDomainsAndActionType, isActionTypeEqual,
} from '../../util';

const initialState = {};

function createRandomKey() {
  return Math.random().toString(29).substr(2, 15) + Math.random().toString(29).substr(2, 15);
}
const PopupReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { actionType, domains } = getDomainsAndActionType(type);
  if (!isActionTypeEqual([UI_DOMAIN, POPUPS_DOMAIN], domains)) return state;
  switch (actionType) {
    case RESET: return { ...initialState };
    case ADD: {
      const notification = payload;
      return {
        ...state,
        [createRandomKey()]: notification,
      };
    }
    case REMOVE: {
      const popupKey = payload;
      const newState = { ...state };
      delete newState[popupKey];
      return newState;
    }
    default: return state;
  }
};

export default PopupReducer;
