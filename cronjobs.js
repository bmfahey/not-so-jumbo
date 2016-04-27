var crontab = require('node-crontab');
var job0 = crontab.scheduleJob("1 0 * * 0", deleteThisDay(0));
var job1 = crontab.scheduleJob("1 0 * * 1", deleteThisDay(1));
var job2 = crontab.scheduleJob("1 0 * * 2", deleteThisDay(2));
var job3 = crontab.scheduleJob("1 0 * * 3", deleteThisDay(3));
var job4 = crontab.scheduleJob("1 0 * * 4", deleteThisDay(4));
var job5 = crontab.scheduleJob("1 0 * * 5", deleteThisDay(5));
var job6 = crontab.scheduleJob("1 0 * * 6", deleteThisDay(6));

deleteThisDay(day){
        db.collection('users', function(error, coll) {
                db.collection('users').find().toArray(function (error, result) {
                        for(i = 0; i < result.length; i++){
                                result[i].days[day].fat = 0;
                                result[i].days[day].protein = 0;
                                result[i].days[day].calories = 0;
                                db.collection('users').update({"FB_id":fb_id}, {$set: result[0]}, function(error, result) {
                                        if (error) {
                                                response.send(500);
                                        } else {
                                                response.send(200);
                                        }
                                });
                        }
                }); //if user does not exist
        });
}