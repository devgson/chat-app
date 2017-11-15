var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');
  
  socket.on('newMessage', function(message){
    console.log(`Message : ${message.text}`);
    var li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
  });

  socket.on('newLocationMessage', function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank"></a>');
    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
  });

});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from : 'Godson',
    text : $('[name=message]').val()
  }, function(message){
    console.log('I got it', message);
  });
});

var point = $('#send-location');
point.on('click', function(e) {
  if(!navigator.geolocation){
    alert('Geolocation not supported by browser')
  }else{
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
    }, function(error) {
      alert(error);
    } );
  }
});