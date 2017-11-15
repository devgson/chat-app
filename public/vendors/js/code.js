var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');
  
  socket.on('newMessage', function(message){
    console.log(`Message : ${message.text}`)
  });

  /*socket.emit('createMessage', {
    from : 'Godson',
    text : 'Hello'
  })*/
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

