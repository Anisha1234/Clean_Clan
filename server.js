//express app
const app = require('express')();
const bodyParser = require('body-parser');
//initial set up
const setUpServer = require('./bin/www');
const setUpDB = require('./bin/db');
const setUpCors = require('./bin/cors');
const setUpSession = require('./bin/session');
//set up for file handling service (file route and file upload middleware)
const fileHandlerInit = require('./app/fileHandler');
const userComponentInit = require('./app/user');
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
    //image handler
  const {
    FileRoute: ImageRoute
  } = fileHandlerInit(config.database, dbConnection.db, 'images');
    //user component
  const {
    UserRoute
  } = userComponentInit();
  //set routes
  app.use("/images", ImageRoute);
  app.use("/user", UserRoute);
  return;
};  

setUp()
  .then(()=> setUpServer(app, config.port))
  .catch(error=>console.log(error));


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
//app.use('/', router)
//app.use('/signup', signup)
//app.use('/login', login)
//app.use('/profile', profile)
// app.use('/timeline', timeline)
// app.use('/post', post)
// app.use('/leaderboard', leaderboard)
// app.use('/issues', issues)
// app.use('/report', report)
