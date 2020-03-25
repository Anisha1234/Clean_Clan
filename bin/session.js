const session = require('express-session');
/**
 * @function: set up session middleware
 * @param {Express} app - Express server
 * @param {object} configOption - session config option
 */
module.exports = (app, configOption)=>{
  const {secret, cookieMaxAge} = configOption;
  app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: cookieMaxAge,
      path: '/'
    }
  }));
};