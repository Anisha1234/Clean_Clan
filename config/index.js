const config = {
<<<<<<< HEAD
  database: {
    url: 'mongodb://localhost/tcs',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }, // this is for database set up
  session: {
    secret: 'tcshack',
    cookieMaxAge: 43200 // in second ~= 12 hours
  }, // this is for session set up
  port: process.env.PORT || 3000
};

module.exports = config;
=======
  database:{
    url: 'mongodb://localhost/tcs',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }, //this is for database set up
  session:{
    secret: 'tcshack',
    cookieMaxAge: 43200 //in second ~= 12 hours
  }, //this is for session set up
  port: process.env.PORT || 3000
}

module.exports = config;
>>>>>>> 8664d7c... set up fileHandler service and create user service
