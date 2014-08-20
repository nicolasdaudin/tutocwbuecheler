var express = require('express');
var router = express.Router();
var utils = require('./../utils');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page .*/
router.get('/helloworld', function (req,res){
	res.render('helloworld',{title: 'Hello, World!'})
});

/* GET Userist page. */
router.get('/userlist',function(req,res){
	var db = req.db;	
	var collection = db.get('usercollection');	
	collection.find({},{},function(e,docs){
		res.render('userlist',{
			"userlist":docs
		});
	});
});

/* GET New User page. */
router.get('/newuser', function(req,res){
	res.render('newusery',{title: 'Add New User'});
});

/* POST to Add User Service */
router.post('/adduser', function(req,res){
	var db = req.db;

	// form values. There rely on the 'name' attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	// INSEEERRTTT
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err,doc){
		if (err){
			// It failed, return an error
			res.send("There was a problem adding the information to the DB");
		} else {
			// If it worked, set the header so the address bar doesn't still say 'adduser'
			res.location("userlist");
			// and forward to success page
			res.redirect("userlist");
		}
	});

});

module.exports = router;
