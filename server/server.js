var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var { User } = require('./utils/users.js');
var { generateMessage, generateLocationMessage } = require('./utils/generateMessage');
var { realString } = require('./utils/realString');

var port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new User();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'../public')));
 
app.get('/', function(req, res, next){
  res.render('index');
});

app.get('/chat', function(req, res, next){
  res.render('chat');
});


io.on('connection', (socket) => {
  socket.on('join', ( params, callback ) => {
    params.room = params.room.toLowerCase();
    if( !realString(params.name) || !realString(params.room) ){
      return callback('Input should be valid');
    }
    //console.log(users.getUsername(params.name, params.room) );
    if( users.getUsername(params.name, params.room) ){
      return callback('Username already Exists, Pick another ');
    }
    
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin',`Welcome to the chat App`) );
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} Joined`) );
    callback();    
  });

  socket.emit('activeRooms',users.getActiveRooms());

  socket.on('createMessage', ( message, callback ) => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage',generateMessage(user.name, message.text) );
    callback()
  });

  socket.on('createLocationMessage', coords => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude) );
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if( user ){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left the room`));
    }
  });

});

server.listen(port, function(){
  console.log(`Server started at port ${port} `);
});