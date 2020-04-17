import {
  UI_DOMAIN, POPUPS_DOMAIN,
  ADD, REMOVE, RESET,
} from '../../../constants';
import { updateStoreData } from '../../util';

/**
 * @funtion add a pop-up
 * @param {string} title
 * @param {string} message
 */
function addPopup(title, message) {
  return updateStoreData(ADD, {
    title, message,
  }, UI_DOMAIN, POPUPS_DOMAIN);
}
/**
 * @function: remove a pop-up
 * @param {string} key
 */
function removePopup(key) {
  return updateStoreData(REMOVE, key, UI_DOMAIN, POPUPS_DOMAIN);
}
/**
 * @function: clear all pop-ups
 */
function clearAllPopups() {
  return updateStoreData(RESET, null, UI_DOMAIN, POPUPS_DOMAIN);
}

export {
  addPopup, removePopup, clearAllPopups,
};
