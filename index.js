var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + "./index.html");
});

app.get('./progress', function (request, response) {
	response.sendFile(__dirname + "./progress.html");
});

app.get('./goal', function(request,response) {
	response.sendFile(__dirname+"./goal.html");
});

app.get('./dining', function(request,response) {
	reponse.sendFile(__dirname+"./goal.html");
})

app.listen(process.env.PORT || 8888);
