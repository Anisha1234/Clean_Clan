const serverRoot = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

// common status for request
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// common data update action types
const UPDATE = 'UPDATE';
const RESET = 'RESET';

// common user auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export {
  serverRoot,
  PENDING, DONE, FAIL, UPDATE, RESET,
  LOGGED_IN, LOGGED_OUT,
};
