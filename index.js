var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.sendFile('./index.html' , { root : __dirname});
});

app.listen(process.env.PORT || 8888);
