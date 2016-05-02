var express = require('express');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://not.so.jumbo@gmail.com:comp20-s2016-team2@smtp.gmail.com');

var bodyParser = require('body-parser');
var validator = require('validator');

var crontab = require('node-crontab');

var app = express();

var path = __dirname + "/public/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL ||'mongodb://localhost/not-so-jumbo';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;

var job0 = crontab.scheduleJob("1 0 * * 0", deleteThisDay, [0]);
var job1 = crontab.scheduleJob("1 0 * * 1", deleteThisDay, [1]);
var job2 = crontab.scheduleJob("1 0 * * 2", deleteThisDay, [2]);
var job3 = crontab.scheduleJob("1 0 * * 3", deleteThisDay, [3]);
var job4 = crontab.scheduleJob("1 0 * * 4", deleteThisDay, [4]);
var job5 = crontab.scheduleJob("1 0 * * 5", deleteThisDay, [5]);
var job6 = crontab.scheduleJob("1 0 * * 6", deleteThisDay, [6]);
var send_email = crontab.scheduleJob("0 * * * *", sendEmail);
});


app.use(express.static(path));

app.post('/submitFood', function(request, response) {
	var fb_id = request.body.id;
	fb_id = fb_id.replace(/[^\w\s]/gi, '');
	var timeStamp = new Date();
	var dow = timeStamp.getDay(); //0-6 sun-sat
	var protein = parseFloat(request.body.protein);
	var fat = parseFloat(request.body.fat);
	var calories = parseFloat(request.body.calories);
	var currentProtein = 0;
	var currentCalories = 0;
	var currentFat = 0;
	db.collection('users', function(error, coll) {
		db.collection('users').find({"FB_id":fb_id}).toArray(function (error, result) {
			if (result.length < 1) {
				initPerson(fb_id, protein, calories, fat, dow);
			}
			else {
				db.collection('users').find({"FB_id":fb_id}).toArray(function (error, result) {
					currentProtein = result[0].days[dow].protein + protein;
					currentCalories = result[0].days[dow].calories + calories;
					currentFat = result[0].days[dow].fat + fat;
					result[0].days[dow].fat = currentFat;
					result[0].days[dow].protein = currentProtein;
					result[0].days[dow].calories = currentCalories;
					db.collection('users').update({"FB_id":fb_id}, {$set: result[0]}, function(error, result) {
						if (error) {
							response.send(500);
						} else {
							response.send(200);
						}
					});
				});

			}
		}); //if user does not exist
	});
});
function initPerson(fb_id, protein, calories, fat, dow) {
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
        "days": [{"day": 0, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 1, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 2, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 3, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 4, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 5, "protein": 0, "fat": 0, "calories": 0},
                 {"day": 6, "protein": 0, "fat": 0, "calories": 0}]

	};
	db.collection('users', function(error, coll) {
		var id = coll.insert(toInsert, function(error, saved){
			if (error) {
			} else {
				coll.find({"FB_id":fb_id}).toArray(function (error, result) {
					if(error){
					}else{
						currentProtein = result[0].days[dow].protein + protein;
						currentCalories = result[0].days[dow].calories + calories;
						currentFat = result[0].days[dow].fat + fat;
						result[0].days[dow].fat = currentFat;
						result[0].days[dow].protein = currentProtein;
						result[0].days[dow].calories = currentCalories;
						coll.update({"FB_id":fb_id}, {$set: result[0]}, function(error, result) {
						});

					}
				});
			}
		});
	});
}
//finds id in database to send back progress of the user
app.post('/sendProgress', function(request, response) {
	var id = request.body.id;
	id = id.replace(/[^\w\s]/gi, '');
	var current_time = new Date();
	db.collection("users", function(error, col){
		if(error) {
		} else {
			col.find({"FB_id":id}).toArray(function(err, result) {
				if(err) {
				} else {
					if (result.length == 1) {
						var goal_time = result[0].goal.time_stamp;
						var prog_fat = 0;
						var prog_cal = 0;
						var prog_prot = 0;

						if(goal_time != "")
						{
							//find diff in days
							var one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
							var diff_days = Math.round(Math.abs((current_time.getTime() - goal_time.getTime())/(one_day)));
							var current_dow = current_time.getDay();
							var goal_dow = goal_time.getDay(); //dow goal was set
							if(diff_days < 7) { //goal is outdated by week
								for(var i=goal_dow; i<=goal_dow + Math.abs((current_dow - goal_dow)); i++) {
									prog_fat += result[0].days[i%7].fat;
									prog_prot += result[0].days[i%7].protein;
									prog_cal += result[0].days[i%7].calories;
								}
								if(result[0].goal.fat != 0)
									prog_fat = prog_fat/result[0].goal.fat;
								if(result[0].goal.calories != 0)
									prog_cal = prog_cal/result[0].goal.calories;
								if(result[0].goal.protein != 0)
									prog_prot = prog_prot/result[0].goal.protein;
							}
						}
						response.json({"fat": prog_fat, "protein": prog_prot, "calories": prog_cal, "cal_goal": result[0].goal.calories, "fat_goal": result[0].goal.fat, "pro_goal" : result[0].goal.protein});
					}
					else {
						response.json({});
					}
				}
			});
		}
	});
});

function deleteThisDay(day) {
        db.collection('users', function(error, coll) {
                coll.find().toArray(function (error, result) {
                        for(i = 0; i < result.length; i++){
                                result[i].days[day].fat = 0;
                                result[i].days[day].protein = 0;
                                result[i].days[day].calories = 0;
                                coll.update({"FB_id":result[i].FB_id}, {$set: result[i]});
                        }
                }); //if user does not exist
        });
}

function sendEmail() {
        db.collection('users', function(error, coll) {
                coll.find().toArray(function (error, result) {
                        for(i = 0; i < result.length; i++){
                                if((!result[i].goal["sent_email"]) && result[i].email != ""){
                                        //find diff in days
                                        one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                                        current_time = new Date();
                                        diff_days = Math.round(Math.abs((current_time.getTime() - result[i].goal["time_stamp"].getTime())/(one_day)));
                                        if(diff_days>7){
											result[i].goal["sent_email"] = true;
											coll.update({"FB_id":result[i].FB_id}, {$set: result[i]});
                                                // SEND EMAIL
                                                var mailOptions = {
                                                    from: '"Not So Jumbo" <no-reply@not.so.jumbo.heroku.com>', // sender address
                                                    to: result[i]["email"], // list of receivers
                                                    subject: 'Update your goal!', // Subject line
                                                    text: "It's been over a week since you updated your goal, "
																+ "set a new one to continue tracking your progress!"
																+ "\n\n http://not-so-jumbo.herokuapp.com/goal", // plaintext body
                                                };
                                                transporter.sendMail(mailOptions, function(error, info){
                                                    if(error){
                                                        console.log(error);
                                                    }
                                                    // Uncomment to understand what is happening
                                                    console.log('Message sent: ' + info.response);
                                                });


                                        }
                                }
                        }
                }); //if user does not exist
        });
}

app.post('/submitGoal', function(request, response) {
        var id = request.body.fb_id;
        var email = request.body.email;
        var calories = request.body.calories;
        var fat = request.body.fat;
        var protein = request.body.protein;
		var email_bool = false;
		if (email == "") {
			email_bool = true;
		}
        var toInsert;
        toInsert = {
                "calories": calories,
                "fat" : fat,
                "protein" : protein,
                "sent_email": email_bool,
                "time_stamp": new Date()
        };
        db.collection("users", function(error, col){
                col.update({"FB_id":id},{$set: {"goal":toInsert, "email":email}},{"upsert":true},function(error, count, status) {
                        if(error){
                                response.send(500);
                        } else {
                                response.send(200);

                        }
                });
        });
});

app.post('/submitHistory', function(request, response){
	var id = request.body.fb_id;
	db.collection("users", function(err, coll){
		db.collection("users").find({"FB_id": id}).toArray(function(er, cursor){
			if(!er)
			{
				response.send(JSON.stringify(cursor));
			} else {
				response.send(500);
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

var router = express.Router();

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

router.get("/history", function(request, response) {
	response.sendFile(path+"history.html");
});

router.get("/tuftsSuggestions", function(request, response) {
	response.sendFile(path+"../tufts_dining_data.json");
});

app.use("/",router);

app.listen(process.env.PORT || 8888);
