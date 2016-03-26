var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, './', 'index.html'));
});

app.listen(process.env.PORT || 8888);
