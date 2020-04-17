// SERVER_ROOT:
const SERVER_ROOT = process.env.NODE_ENV === 'production'
  ? '' : 'http://localhost:3000';

// common actions
const UPDATE = 'UPDATE';
const RESET = 'RESET';
const ADD = 'ADD';

// common request statuses
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// store domains
const USER_DOMAIN = 'user';
const POSTS_DOMAIN = 'posts';
const UI_DOMAIN = 'ui';
// common subdomains
const POOL_DOMAIN = 'pool';

// USER_DOMAIN subdomains
const AUTH_DOMAIN = 'auth';
const DATA_DOMAIN = 'data';

// POSTS_DOMAIN subdomains
const MINE_DOMAIN = 'mine';
const ALL_DOMAIN = 'all';

// UI_DOMAIN subdomains
const POPUPS_DOMAIN = 'popups';

// POSTS_DOMAIN actions

// USERS_DOMAIN actions
const CHANGE_IMAGE = 'CHANGE_IMAGE';
const LOAD_IMAGES = 'LOAD_IMAGES';

// USER_DOMAIN: auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

// UI_DOMAIN/POPSUP_DOMAIN actions
const REMOVE = 'REMOVE';


export {
  SERVER_ROOT,
  PENDING, DONE, FAIL,
  UPDATE, RESET, ADD,
  POOL_DOMAIN,
  USER_DOMAIN, AUTH_DOMAIN, DATA_DOMAIN,
  LOAD_IMAGES, CHANGE_IMAGE,
  LOGGED_IN, LOGGED_OUT,
  POSTS_DOMAIN, MINE_DOMAIN, ALL_DOMAIN,
  UI_DOMAIN, POPUPS_DOMAIN,
  REMOVE,
};
