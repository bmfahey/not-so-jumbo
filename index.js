var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.render('./index.html');
});

app.listen(process.env.PORT || 8888);
