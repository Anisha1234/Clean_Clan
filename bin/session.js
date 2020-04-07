const session = require('express-session');
<<<<<<< HEAD
<<<<<<< HEAD
const MongoStore = require('connect-mongo')(session);
=======
>>>>>>> 8664d7c... set up fileHandler service and create user service
=======
const MongoStore = require('connect-mongo')(session);
>>>>>>> 316f811... Finish user services, lint react-views
/**
 * @function: set up session middleware
 * @param {Express} app - Express server
 * @param {object} configOption - session config option
<<<<<<< HEAD
<<<<<<< HEAD
 * @param {mongooseConnection} dbConnection - existing mongoose connection
 */
module.exports = (app, configOption, dbConnection) => {
  const { secret, cookieMaxAge } = configOption;
  app.use(session({
    secret,
    store: new MongoStore({
      mongooseConnection: dbConnection,
      ttl: parseInt(cookieMaxAge)
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(cookieMaxAge) * 1000 // in miliseconds
    }
  }));
};
=======
=======
 * @param {mongooseConnection} dbConnection - existing mongoose connection
>>>>>>> 316f811... Finish user services, lint react-views
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
>>>>>>> 8664d7c... set up fileHandler service and create user service
