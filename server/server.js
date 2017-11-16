var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');
var { generateMessage, generateLocationMessage } = require('./utils/generateMessage');
var { realString } = require('./utils/realString');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'../public')));

app.get('/', function(req, res, next){
  res.render('index.pug');
});

app.get('/chat', function(req, res, next){
  res.render('chat');
});

var server = http.createServer(app);
var io = socketIO(server);

console.log(realString('  fsf'));
console.log('  sd'.trim().length);

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('join', function(param, callback){
    if( !realString(param.name) || !realString(param.room) ){
      callback('Name and room are required');
    }
    callback();
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the room') );

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'User Joined'));

  socket.on('createMessage', function(message, callback) {
    io.emit('newMessage', generateMessage(message.from, message.text) );
    callback();
  });

  socket.on('createLocationMessage', function(coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude , coords.longitude) );
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

server.listen(port, function(){
  console.log(`Server started at port ${port} `);
});