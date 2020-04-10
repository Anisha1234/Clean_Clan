// SERVER_ROOT:
const SERVER_ROOT = process.env.NODE_ENV === 'production'
  ? '' : 'http://localhost:3000';

// store domains
const USER_DOMAIN = 'user';
const POSTS_DOMAIN = 'posts';

// USER_DOMAIN subdomains
const AUTH_DOMAIN = 'auth';
const USER_DATA_DOMAIN = 'data';

// POSTS_DOMAIN subdomains
const MY_POSTS_DOMAIN = 'my_posts';
const ALL_POSTS_DOMAIN = 'all_posts';
const POSTS_POOL_DOMAIN = 'pool';

// common data update action types
const UPDATE = 'UPDATE';
const RESET = 'RESET';

// common request statuses
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// POSTS_DOMAIN special actions
const RECEIVE_POSTS = 'RECEIVE_POSTS';
const ADD_POSTS = 'ADD_POSTS';

// USER_DOMAIN: auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export {
  SERVER_ROOT,
  PENDING, DONE, FAIL,
  UPDATE, RESET,
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
  LOGGED_IN, LOGGED_OUT,
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, POSTS_POOL_DOMAIN,
  ADD_POSTS, RECEIVE_POSTS,
};
