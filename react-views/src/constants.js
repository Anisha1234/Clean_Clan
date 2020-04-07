// SERVER_ROOT:
const SERVER_ROOT = process.env.NODE_ENV === 'production'
  ? '' : 'http://localhost:3000';

// store domains
const USER_DOMAIN = 'user';
const POSTS_DOMAIN = 'posts';

// USER_DOMAIN subdomains
const AUTH_DOMAIN = 'auth';
<<<<<<< HEAD
<<<<<<< HEAD
=======
const REGISTRATION_DOMAIN = 'registration';
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
>>>>>>> 560a7fe... add formik + reform redux store
const USER_DATA_DOMAIN = 'data';

// POSTS_DOMAIN subdomains
const MY_POSTS_DOMAIN = 'my_posts';
const ALL_POSTS_DOMAIN = 'all_posts';
<<<<<<< HEAD
<<<<<<< HEAD
const POSTS_STATUS = 'status';
=======
const PUBLISH_DOMAIN = 'publish';
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
const POSTS_STATUS = 'status';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)

// common data update action types
const UPDATE = 'UPDATE';
const RESET = 'RESET';

// common request statuses
const PENDING = 'PENDING';
const DONE = 'DONE';
const FAIL = 'FAIL';

// POSTS_DOMAIN special actions
const UPDATE_POST_LIKE = 'UPDATE_POST_LIKE';
<<<<<<< HEAD
<<<<<<< HEAD
const UPDATE_POST_DATA = 'UPDATE_POST_DATA';
=======
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
const UPDATE_POST_DATA = 'UPDATE_POST_DATA';
>>>>>>> 2d5cfb4... finish post component (backend and frontend)

// USER_DOMAIN: auth statuses
const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export {
  SERVER_ROOT,
  PENDING, DONE, FAIL,
  UPDATE, RESET,
<<<<<<< HEAD
<<<<<<< HEAD
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
  LOGGED_IN, LOGGED_OUT,
  POSTS_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN, POSTS_STATUS,
  UPDATE_POST_LIKE, UPDATE_POST_DATA,
<<<<<<< HEAD
=======
  USER_DOMAIN, AUTH_DOMAIN, REGISTRATION_DOMAIN, USER_DATA_DOMAIN,
=======
  USER_DOMAIN, AUTH_DOMAIN, USER_DATA_DOMAIN,
>>>>>>> 560a7fe... add formik + reform redux store
  LOGGED_IN, LOGGED_OUT,
  POSTS_DOMAIN, PUBLISH_DOMAIN, MY_POSTS_DOMAIN, ALL_POSTS_DOMAIN,
  UPDATE_POST_LIKE,
>>>>>>> cf60350... Refactor redux code to microservice structure
=======
>>>>>>> 2d5cfb4... finish post component (backend and frontend)
};
