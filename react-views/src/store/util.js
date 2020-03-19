
/**
 * @function - compare types of action in the form of string array
 * @param {string[]} type1 - first type to compare - [...domains, "action_type"]
 * @param {string[]} type2 - second type to compare
 * @return {boolean}
 */
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

export {
  isActionTypeEqual, getDomainsAndActionType,
  updateStoreDataAction,
};
