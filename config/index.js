const config = {
  database:{
    url: 'mongodb://localhost/tcs',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
  }, //this is for database set up
  session:{
    secret: 'tcshack',
    cookieMaxAge: 43200000
  }, //this is for session set up
}

module.exports = config;