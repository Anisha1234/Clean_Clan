/////////////////////  EXPRESS //////////////////
//require our dependencies
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session')
var multer = require('multer');
var serveIndex = require('serve-index')
var body_parser = require('body-parser');


mongoose.connect('mongodb://localhost/tcs', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
})
//handle error in connection
.catch(function(error){
  //handle error
  console.log(error);
});
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log("connection established to db");
  });
// var formidable = require('express-formidable')
var app = express();
var port = 3000;

//route our app
var router = require('./app/routes');
var signup = require('./app/signup');
var login = require('./app/login');
var profile = require('./app/profile');
var timeline = require('./app/timeline');
var post = require('./app/post');
var leaderboard =require('./app/leaderboard');
var issues =require('./app/issues');
var report = require('./app/report');


//set static files(css or js or imgs)
app.use(express.static(__dirname + "/public"));
app.use('/uploads', serveIndex('public/uploads'));

app.use(body_parser.json({limit:'10mb'}));
app.use(body_parser.urlencoded({extended:true}));
// app.use(formidable());


app.use(session({
  secret: 'tcshack',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 3600000,
    domain: "http://localhost:5000"
  }
}))

//setup ejs
app.set('view engine','ejs');
app.set('views',__dirname+'/views')

//development cors
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", ["http://localhost:5000"]);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//express middlewire which have access to all our routes
app.use('/',router);
app.use('/signup',signup);
app.use('/login',login);
app.use('/profile',profile);
app.use('/timeline',timeline);
app.use('/post',post);
app.use('/leaderboard',leaderboard);
app.use('/issues',issues);
app.use('/report',report);

app.get('/auth-check', function(req, res){
  console.log(req.session);
  if(req.session && req.session.email){
    let userData = {
      name: req.session.name, 
      email: req.session.email, 
      userid: req.session.userid,
    }
    return res.status(200).send({is_login: true, user_data: userData});
  }
  return res.status(200).send({is_login: false, user_data: null});
});

//start your server
app.listen(port,function(){
	console.log('App started');
});
