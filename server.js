<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// express app
const app = require('express')();
const bodyParser = require('body-parser');
// initial set up
const setUpServer = require('./bin/www');
const setUpDB = require('./bin/db');
const setUpCors = require('./bin/cors');
const setUpSession = require('./bin/session');
// main components
const FileComponentInit = require('./app/files');
const UserComponentInit = require('./app/user');
const PostComponentInit = require('./app/posts');

// config object
const config = require('./config');

// set up function
const setUp = async () => {
  // body parser
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  // cors
  setUpCors(app);
  // set up mongoDB connection
  const dbConnection = await setUpDB(config.database);
  // session
  setUpSession(app, config.session, dbConnection);
  // set up main components
  const {
    FileRoute: ImageRoute,
    FileUpload: ImageUpload
  } = FileComponentInit(config.database, dbConnection.db, 'images');
  const {
    UserService,
    AuthCheck,
    UserRoute
  } = UserComponentInit(ImageUpload);
  const {
    PostRoute
  } = PostComponentInit(ImageUpload, UserService);
  // set routes
  app.use('/images', ImageRoute);
  app.use('/user', UserRoute);
  app.use('/posts', AuthCheck, PostRoute);
};

setUp()
  .then(() => setUpServer(app, config.port))
  .catch(error => console.log(error));
=======
/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var mongoose = require('mongoose');
=======
/// //////////////////  EXPRESS //////////////////
// require our dependencies
var express = require('express')
var mongoose = require('mongoose')
>>>>>>> 33a516f... Add standardjs lint
var session = require('express-session')
var multer = require('multer')
var serveIndex = require('serve-index')
var body_parser = require('body-parser')
=======
const app = require('express')();
const serveIndex = require('serve-index');
>>>>>>> 8664d7c... set up fileHandler service and create user service

=======
//express app
const app = require('express')();
const bodyParser = require('body-parser');
//initial set up
>>>>>>> 316f811... Finish user services, lint react-views
const setUpServer = require('./bin/www');
const setUpDB = require('./bin/db');
const setUpCors = require('./bin/cors');
const setUpSession = require('./bin/session');
//main components
const FileComponentInit = require('./app/files');
const UserComponentInit = require('./app/user');
const PostComponentInit = require('./app/posts');

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
  const {
    PostRoute
  } = PostComponentInit(ImageUpload, UserService);
  //set routes
  app.use("/images", ImageRoute);
  app.use("/user", UserRoute);
  app.use('/posts', AuthCheck, PostRoute);
  return;
};  

setUp()
  .then(()=> setUpServer(app, config.port))
  .catch(error=>console.log(error));

<<<<<<< HEAD

// route our app
// var router = require('./app/routes')
// var signup = require('./app/signup')
// var login = require('./app/login')
// var profile = require('./app/profile')
// var timeline = require('./app/timeline')
// var post = require('./app/post')
// var leaderboard = require('./app/leaderboard')
// var issues = require('./app/issues')
// var report = require('./app/report')

// set static files(css or js or imgs)
// app.use(express.static(__dirname + '/public'))
// app.use('/uploads', serveIndex('public/uploads'))
// // setup ejs
// app.set('view engine', 'ejs')
// app.set('views', __dirname + '/views')

// express middlewire which have access to all our routes
<<<<<<< HEAD
app.use('/', router)
app.use('/signup', signup)
app.use('/login', login)
app.use('/profile', profile)
app.use('/timeline', timeline)
app.use('/post', post)
app.use('/leaderboard', leaderboard)
app.use('/issues', issues)
app.use('/report', report)

app.get('/auth-check', function (req, res) {
  // console.log(req);
  if (req.session && req.session.email) {
    const userData = {
      name: req.session.name,
      email: req.session.email,
      userid: req.session.userid
    }
    return res.status(200).send({ is_login: true, user_data: userData })
  }
  return res.status(200).send({ is_login: false, user_data: null })
<<<<<<< HEAD
})

<<<<<<< HEAD
//start your server
app.listen(port,function(){
	console.log('App started');
});
>>>>>>> 835febb... Temp commit: login and logout with server
=======
// start your server
app.listen(port, function () {
  console.log('App started')
})
>>>>>>> 33a516f... Add standardjs lint
=======
})
>>>>>>> 8664d7c... set up fileHandler service and create user service
=======
//app.use('/', router)
//app.use('/signup', signup)
//app.use('/login', login)
//app.use('/profile', profile)
// app.use('/timeline', timeline)
// app.use('/post', post)
// app.use('/leaderboard', leaderboard)
// app.use('/issues', issues)
// app.use('/report', report)
>>>>>>> 316f811... Finish user services, lint react-views
=======
>>>>>>> 15c5f0f... refactor user and files components
