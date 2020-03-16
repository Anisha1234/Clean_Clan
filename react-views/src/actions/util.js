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

const doSth = () => {};

export {
  updateStoreDataAction, doSth,
};
