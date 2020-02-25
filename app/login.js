var express = require('express');
var path = require('path');
var User = require('../model/user');
//create our router object
var bcrypt = require('bcrypt');
var router = express.Router();

//export our router
module.exports = router;

router.get('/',function(req,res){
	console.log("Got get request");
	res.sendFile(path.join(__dirname,'../login.html'));
});

router.post('/',function(req,res){
	console.log("got post request");
	if(!req.body.email || !req.body.password){
		return res.status(502).send('Insufficient field values');
	}
	User.findOne({email:req.body.email}, function(err,user){
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}
		if(!user){
			return res.status(200).send("Not registered");
		}
		bcrypt.compare(req.body.password, user.password, function(err, result) {
			console.log(result);
			if(err){
				console.log(err);
				return res.status(500).send("Internal Server Error");
			} 
			if(result) {
				req.session.email = user.email;
				req.session.userid = user._id;
				req.session.userimage=user.image;
				req.session.name=user.name;
				console.log(req.session.userid + " is the id");
				console.log(req.session.userimage + " is the image");
				response={};
				response[0]="Success";
				response[1]= user._id;
				return res.status(200).send(response);
			}
			return res.status(200).send("wrong password");
		});
	});
});
