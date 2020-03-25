const app = require('express')();
const serveIndex = require('serve-index');

const setUpServer = require('./bin/www');
const setUpDB = require('./bin/db');
const setUpCors = require('./bin/cors');
const setUpSession = require('./bin/session');

const {fileUploadInit, fileRouteInit} = require('./app/fileHandler');

const config = require('./config');

//set up function
const setUp= async ()=>{
  //set up server
  setUpServer(app, config.port);
  //cors
  setUpCors(app);
  //session
  setUpSession(app, config.session);
  //set up mongoDB connection
  const dbInstance = await setUpDB(config.database);
  //set up file upload handler (middleware and route)
  const imageUpload = fileUploadInit(config.database, 'images');
  const imageRoute = fileRouteInit(dbInstance, "images");
  //initiate routes
  
  //set routes
  app.use("/images", imageRoute);
};  

setUp()
  .catch(error=>console.log(error));


// route our app
var router = require('./app/routes')
var signup = require('./app/signup')
var login = require('./app/login')
var profile = require('./app/profile')
var timeline = require('./app/timeline')
var post = require('./app/post')
var leaderboard = require('./app/leaderboard')
var issues = require('./app/issues')
var report = require('./app/report')

// set static files(css or js or imgs)
app.use(express.static(__dirname + '/public'))
app.use('/uploads', serveIndex('public/uploads'))
// setup ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// express middlewire which have access to all our routes
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
})