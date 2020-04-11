// SERVER_ROOT:
const SERVER_ROOT = process.env.NODE_ENV === 'production'
  ? '' : 'http://localhost:3000';

// store domains
const USER_DOMAIN = 'user';
const POSTS_DOMAIN = 'posts';
// common subdomains
const POOL_DOMAIN = 'pool';

// USER_DOMAIN subdomains
const AUTH_DOMAIN = 'auth';
const DATA_DOMAIN = 'data';

// POSTS_DOMAIN subdomains
const MINE_DOMAIN = 'mine';
const ALL_DOMAIN = 'all';

// common actions
const UPDATE = 'UPDATE';
const RESET = 'RESET';

// common request statuses
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// POSTS_DOMAIN actions
const RECEIVE = 'RECEIVE';
const ADD = 'ADD';

// USERS_DOMAIN actions
const CHANGE_IMAGE = 'CHANGE_IMAGE';
const LOAD_IMAGES = 'LOAD_IMAGES';

// USER_DOMAIN: auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export {
  SERVER_ROOT,
  PENDING, DONE, FAIL,
  UPDATE, RESET,
  POOL_DOMAIN,
  USER_DOMAIN, AUTH_DOMAIN, DATA_DOMAIN,
  LOAD_IMAGES, CHANGE_IMAGE,
  LOGGED_IN, LOGGED_OUT,
  POSTS_DOMAIN, MINE_DOMAIN, ALL_DOMAIN,
  ADD, RECEIVE,
};
