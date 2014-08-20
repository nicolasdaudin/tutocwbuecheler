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

/* GET Edit User page. */
router.get('/edituser/:username', function(req,res){
	var db = req.db;

	var username = req.params.username;
	console.log('username to be edited : ' + username);

	var collection = db.get('usercollection');

	// GEt users
	collection.findOne({"username" : username}, function(err,doc){
		if (err){
			// It failed, return an error
			res.send("There was a problem returning information from DB");
			console.log("No user found for username " + username);
		} else {
			console.log("User found for username " + username + " is " + "{username:"+doc.username+",email:"+doc.email+"}");
			res.render('edituser',{
				user  : doc,
				title : "Edit existing user"
			});
		}
	});
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

/* POST to Modify User service */
router.post('/modifyuser',function(req,res){
	var db = req.db;

	// form values
	var oldUserName = req.body.oldusername;
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	// UPDATE
	collection.update({"username" : oldUserName},{"username" : userName,"email":userEmail}, function(err,doc){
		if (err){
			// It failed, return an error
			res.send("There was a problem modifying the information to the DB");
		} else {
			// If it worked, set the header so the address bar doesn't still say 'adduser'
			res.location("userlist");
			// and forward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
