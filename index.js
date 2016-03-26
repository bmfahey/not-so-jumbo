var express = require('express');
var app = express();

app.use(express.static(__dirname);

app.get('/', function(request, response) {
  response.send("./index.html");
});

app.listen(process.env.PORT || 8888);
