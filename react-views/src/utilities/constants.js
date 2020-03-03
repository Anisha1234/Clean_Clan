const serverRoot = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4567';

const LOGIN_STATE = 'LOGIN';
const LOGOUT_STATE = 'LOGOUT';
const PENDING_STATE = 'PENDING';

export {
  serverRoot, LOGIN_STATE, LOGOUT_STATE, PENDING_STATE,
};
