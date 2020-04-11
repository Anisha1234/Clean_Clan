import { normalize, schema } from 'normalizr';

export const doSth = () => {};

const userSchema = new schema.Entity('user', {}, { idAttribute: '_id' });
/**
 * @function normalizeUsers : normalize an array of user data
 * @param {any[]} users
 * @return {{
 *  userIDs: string[],
 *  userEntries: {
 *    [key: string]: any
 *  }
 * }}
 */
const normalizeUsers = (users) => {
  const {
    result: userIDs,
    entities: {
      user: userEntries,
    },
  } = normalize(users, [userSchema]);
  return { userIDs, userEntries };
};
/**
 * @function: normalize single user
 * @param {any} user
 * @return {{
 *  userID: string,
 *  userEntries: {
 *    [key: string]: any
 *  }
 * }}
 */
const normalizeUser = (user) => {
  const {
    result: userID,
    entities: {
      user: userEntries,
    },
  } = normalize(user, userSchema);
  return { userID, userEntries };
};

export {
  normalizeUsers, normalizeUser,
};
