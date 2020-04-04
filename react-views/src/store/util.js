import { UPDATE, RESET } from '../constants';
/**
 * @function - compare types of action in the form of string array
 * @param {string[]} type1 - first type to compare - [...domains, "action_type"]
 * @param {string[]} type2 - second type to compare
 * @return {boolean}
 */
const isActionTypeEqual = (type1, type2) => type1.join('/') === type2.join('/');
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

export {
  isActionTypeEqual, getDomainsAndActionType, createCommonSubreducer,
  updateStoreDataAction,
};
