var express = require('express');
var app = express();
var router = express.Router();
var path = __dirname + "/public/";

app.use(express.static(path));

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
