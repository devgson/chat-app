var path = require('path');
var express = require('express');
var port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname+'../public')) );

app.get('/', function(req, res, next){
  res.render('index.pug');
});

app.listen(port, function(){
  console.log(`Server started at port ${port} `);
});