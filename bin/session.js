const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
/**
 * @function: set up session middleware
 * @param {Express} app - Express server
 * @param {object} configOption - session config option
 * @param {mongooseConnection} dbConnection - existing mongoose connection
 */
module.exports = (app, configOption, dbConnection)=>{
  const {secret, cookieMaxAge} = configOption;
  app.use(session({
    secret,
    store: new MongoStore({
      mongooseConnection: dbConnection,
      ttl: parseInt(cookieMaxAge)
    }),
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: parseInt(cookieMaxAge)*1000 //in miliseconds
    }
  }));
};