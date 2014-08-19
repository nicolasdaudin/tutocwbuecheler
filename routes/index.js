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
	console.log('userlist db is ' + utils.objToString(db));
	var collection = db.get('usercollection');
	console.log('collection found is ' + utils.objToString(collection));
	collection.find({},{},function(e,docs){
		res.render('userlist',{
			"userlist":docs
		});
	});
});

module.exports = router;
