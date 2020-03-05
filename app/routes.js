//require express
var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var router = express.Router();

//export our router
module.exports = router;

//route for our home
router.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'../index.html'));
});

router.get('/logout',function(req,res){
	req.session.destroy(function(error){
		if(error){
			return res.status(500).send("Internal Server Error");
		}
		return res.status(200).send("Success");
	});
//	res.sendFile(path.join(__dirname,'../logout.html'));
})
// router.get('/profile',auth,function(req,res,next){
// 	if(req.session && req.session.email){
// 		// res.send("Welcome "+req.session.email);
// 				User.findOne({email:req.session.email},function(err,user){
// 					if(err){
// 						console.log(err);
// 						res.send(err);
// 					}
// 					else{
// 						console.log(user.name);
// 					       res.send("Welcome "+user.name+ " Your email is "+user.email);

// 						}
// 					});
// 	}
// })
