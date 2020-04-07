<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { UPDATE, RESET } from '../constants';
=======
>>>>>>> f86c3d6... Split common logic (util.js)
=======

>>>>>>> cf60350... Refactor redux code to microservice structure
=======
import { UPDATE, RESET } from '../constants';
>>>>>>> 560a7fe... add formik + reform redux store
/**
 * @function - compare types of action in the form of string array
 * @param {string[]} type1 - first type to compare - [...domains, "action_type"]
 * @param {string[]} type2 - second type to compare
 * @return {boolean}
 */
<<<<<<< HEAD
<<<<<<< HEAD
const isActionTypeEqual = (type1, type2) => type1.join('/') === type2.join('/');
=======
const isActionTypeEqual = (type1, type2) => {
  if (type1.length !== type2.length) {
    return false;
  }
  for (let i = 0; i < type1.length; i += 1) {
    if (type1[i] !== type2[i]) {
      return false;
    }
  }
  return true;
};
>>>>>>> f86c3d6... Split common logic (util.js)
=======
const isActionTypeEqual = (type1, type2) => type1.join('/') === type2.join('/');
>>>>>>> 560a7fe... add formik + reform redux store
/**
 * @function:'domain1/domain2/.../actionType'=> [...domains], actionType
 * @param {string} type
 */
const getDomainsAndActionType = (type) => {
  const typeArr = type.split('/');
  const actionType = typeArr.pop();
  return {
    domains: typeArr,
    actionType,
  };
};
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
/**
 * @function - generic action creater to update user state (auth, registration, data...)
 * @param  {...string} domains - array of domain name strings
 * @param {string} actionType - action type
 * @param {object} payload - action data
 */
const updateStoreDataAction = (actionType, payload, ...domains) => ({
  type: [...domains, actionType].join('/'),
  payload,
});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 560a7fe... add formik + reform redux store
/**
 * @function - create sub reducers for user
 * @param {object} initialState
 * @param {string[]} givenDomains - array of domains from high-to-low levels
 * @return {function} - a reducer
 */
function createCommonSubreducer(initialState, ...givenDomains) {
  return (state = initialState, action) => {
    const { type, payload } = action;
    const { domains, actionType } = getDomainsAndActionType(type);
    if (!isActionTypeEqual(givenDomains, domains)) return state;
    switch (actionType) {
      case UPDATE:
        return { ...state, ...payload };
      case RESET:
        return { ...state, ...initialState };
      default:
        return state;
    }
  };
}
<<<<<<< HEAD

export {
  isActionTypeEqual, getDomainsAndActionType, createCommonSubreducer,
  updateStoreDataAction,
=======

export {
  isActionTypeEqual, getDomainsAndActionType,
>>>>>>> f86c3d6... Split common logic (util.js)
=======
=======
>>>>>>> 560a7fe... add formik + reform redux store

export {
  isActionTypeEqual, getDomainsAndActionType, createCommonSubreducer,
  updateStoreDataAction,
>>>>>>> cf60350... Refactor redux code to microservice structure
};
