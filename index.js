var express = require('express');

var bodyParser = require('body-parser');
var validator = require('validator');

var app = express();
var router = express.Router();
var path = __dirname + "/public/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;
})
app.use(express.static(path));

app.post('/submitFood', function(request, response) {
	var id = request.body.id;
	id = id.replace(/[^\w\s]/gi, '');
	var timeStamp = request.body.timeStamp;
	timeStamp = timeStamp.replace(/[^\w\s]/gi, '');
	var protein = request.body.protein;
	protein = protein.replace(/[^\w\s]/gi, '');
	var fat = request.body.fat;
	fat = fat.replace(/[^\w\s]/gi, '');
	var calories = request.body.calories;
	calories = calories.replace(/[^\w\s]/gi, '');
	var toInsert = {
		"id": id,
		"timeStamp": timeStamp,
		"protein": protein,
		"fat": fat,
		"calories": calories,
	};

});
//finds id in database to send back progress of the user
app.post('/sendProgress', function(request, response) {
	var id = request.body.id;
	id = id.replace(/[^\w\s]/gi, '');
	var toInsert = {
		"id":id,
	};
});
app.post('/submitGoal', function(request, response) {
	var goal = request.body.goal;
	goal = goal.replace(/[^\w\s]/gi, '');
	var toInsert = {
		"goal": goal,
	};
});
//finds id in database to make suggestions for food being served at the 
//dining hall
app.post('/sendSuggest', function(request, response){
	var id = request.body.id;
	id = id.replace(/[^\w\s]/gi, '');
	var toInsert = {
		"id":id,
	};
});
router.use(function (req,res,next) {
	next();
});

router.get("/",function(request,response) {
	response.sendFile(path+"index.html");
});

router.get("/progress", function (request,response) {
	response.sendFile(path+"progress.html");
});

router.get("/goal", function(request,response) {
	response.sendFile(path+"goal.html");
});

router.get("/dining", function(request,response) {
	response.sendFile(path+"dining.html");
});

app.use("/",router);

app.listen(process.env.PORT || 8888);
