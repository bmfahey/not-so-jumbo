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
	var fb_id = request.body.id;
	fb_id = id.replace(/[^\w\s]/gi, '');
	var timeStamp = Date();
	var dow = timeStamp.getDay(); //0-6 sun-sat
	var protein = request.body.protein;
	protein = protein.replace(/[^\w\s]/gi, '');
	var fat = request.body.fat;
	fat = fat.replace(/[^\w\s]/gi, '');
	var calories = request.body.calories;
	calories = calories.replace(/[^\w\s]/gi, '');
	var update = {
		"FB_id": fb_id,
		$set: {"days": {"dow": dow,  "protein": protein, "fat": fat, "calories": calories, "date_edited": dayOfMonth}}
	};
	db.collection('users', function(error, coll) {
		if (coll.find({"FB_id":fb_id}).count() < 1) { //if user does not exist
			initPerson(fb_id);
		}
		coll.find({"FD_id":fb_id}, function (error, result) {
			result.days[day].protein += protein;
			result.days[day].calories += calories;
			result.days[day].fat += fat;
		});
	});
});
function initPerson(fb_id) {
	var toInsert = {
		"FB_id": fb_id,
        "email": "",
        "goal": {
            "fat": 0,
            "protein": 0,
            "calories": 0,
            "time_stamp": "",
            "sent_email": false,
        },
        "days": [{"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0},
                 {"protein": 0, "fat": 0, "calories": 0}]

	};
	db.collection('users', function(error, coll) {
		var id = coll.insert(toInsert, function(error, saved){
			if (error) {
				response.send(500);
			} else {
				response.send(200);
			}
		});
	});
}
//finds id in database to send back progress of the user
app.post('/sendProgress', function(request, response) {
	var id = request.body.id;
	id = id.replace(/[^\w\s]/gi, '');
	var toInsert = {
		"FB_id":id,
	};
});
app.post('/submitGoal', function(request, response) {
        var id = request.body.fb_id;
        var email = request.body.email;
        var calories = request.body.calories;
        var fat = request.body.fat;
        var protein = request.body.protein;
        var toInsert;
        toInsert = {
                "calories": calories,
                "fat" : fat,
                "protein" : protein,
                "sent_email": false,
                "time_stamp": new Date()
        };
        db.collection("users", function(error, col){
                col.update({"FB_id":id},{$set: {goals:toInsert}},{"upsert":true},function(error, count, status) {
                        if(error){
                                response.send(500);
                        } else {
                                response.send(200);
                        }
                });
        });
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
router.use(function (request,response,next) {
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
