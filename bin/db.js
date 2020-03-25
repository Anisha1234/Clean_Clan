const mongoose = require('mongoose');
/**
 * @function: set up mongoDB connection
 * @param {object} dbConfig: database config option
 * @return mongodb.Db instance - useful for set up file handler
 */
module.exports = (dbConfig)=>{
  const {url, options} = dbConfig;
  return new Promise((resolve, reject)=>{
    mongoose.connect(url, options)
      .then(()=>{
        const dbConnection = mongoose.connection;
        //event listener for database connection error handling
        dbConnection.on('error', console.error.bind(console, "db connection error: "));
        //succesfully connnect => resolve the mongodb.Db instance 
        dbConnection.once('open', ()=>resolve(dbConnection.db));
      })
      .catch((error)=> reject(error));
  });
};