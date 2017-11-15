var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'../public')));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.emit('newMessage',{
    from : 'Admin',
    text : 'Welcome to the room'
  });

  socket.broadcast.emit('newMessage',{
    from : 'Admin',
    text : 'User joined'
  });
  
  socket.on('createMessage', function(message){
    /*io.emit('newMessage', {
      from : message.from,
      text : message.text,
      createdAt : new Date().getTime()
    });*/
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', function(req, res, next){
  res.render('index.pug');
});

server.listen(port, function(){
  console.log(`Server started at port ${port} `);
});