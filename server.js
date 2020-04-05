//express app
const app = require('express')();
const bodyParser = require('body-parser');
//initial set up
const setUpServer = require('./bin/www');
const setUpDB = require('./bin/db');
const setUpCors = require('./bin/cors');
const setUpSession = require('./bin/session');
//main components
const FileComponentInit = require('./app/files');
const UserComponentInit = require('./app/user');

//config object
const config = require('./config');

//set up function
const setUp= async ()=>{
  //body parser
   app.use(bodyParser.json({ limit: '10mb' }));
   app.use(bodyParser.urlencoded({ extended: true }));
  //cors
  setUpCors(app);
  //set up mongoDB connection
  const dbConnection = await setUpDB(config.database);
  //session
  setUpSession(app, config.session, dbConnection);
  //set up main components
  const {
    FileRoute: ImageRoute,
    FileUpload: ImageUpload
  } = FileComponentInit(config.database, dbConnection.db, 'images');
  const {
    UserService,
    AuthCheck,
    UserRoute,
  } = UserComponentInit(ImageUpload);
  //set routes
  app.use("/images", ImageRoute);
  app.use("/user", UserRoute);
  return;
};  

setUp()
  .then(()=> setUpServer(app, config.port))
  .catch(error=>console.log(error));

