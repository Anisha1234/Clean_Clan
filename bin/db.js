const mongoose = require('mongoose');
/**
 * @function: set up mongoDB connection
 * @param {object} dbConfig: database config option
<<<<<<< HEAD
<<<<<<< HEAD
 * @return mongoose connection - useful for set up file handler and session store
 */
module.exports = (dbConfig) => {
  const { url, options } = dbConfig;
  return new Promise((resolve, reject) => {
    mongoose.connect(url, options)
      .then(() => {
        const dbConnection = mongoose.connection;
        // set the option
        mongoose.set('useFindAndModify', false);
        // event listener for database connection error handling
        dbConnection.on('error', console.error.bind(console, 'db connection error: '));
        resolve(dbConnection);
      })
      .catch((error) => reject(error));
  });
};
=======
 * @return mongodb.Db instance - useful for set up file handler
=======
 * @return mongoose connection - useful for set up file handler and session store
>>>>>>> 316f811... Finish user services, lint react-views
 */
module.exports = (dbConfig)=>{
  const {url, options} = dbConfig;
  return new Promise((resolve, reject)=>{
    mongoose.connect(url, options)
      .then(()=>{
        const dbConnection = mongoose.connection;
        //set the option
        mongoose.set('useFindAndModify', false);
        //event listener for database connection error handling
        dbConnection.on('error', console.error.bind(console, "db connection error: "));
        resolve(dbConnection);
      })
      .catch((error)=> reject(error));
  });
};
>>>>>>> 8664d7c... set up fileHandler service and create user service
