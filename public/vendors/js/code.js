var socket = io();

socket.on('connect', function() {
  console.log('Connected to Server');
  
  socket.emit('join', $.deparam(window.location.search), function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No erro');
    }
  });

  socket.on('newMessage', function(message){
    var timestamp = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
      from : message.from,
      text : message.text,
      createdAt : timestamp
    });
    $('#messages').append(html);
  });

  socket.on('newLocationMessage', function(message){
    var timestamp = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from : message.from,
      text : message.text,
      url : message.url,
      createdAt : timestamp
    });
    $('#messages').append(html);
    $('#send-location').removeAttr('disabled').text('Send Location');
  });

});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageText = $('[name=message]');
  socket.emit('createMessage', {
    from : 'Godson',
    text : messageText.val()
  }, function(){
    messageText.val('');
  });
  
});

var point = $('#send-location');
point.on('click', function(e) {
  if(!navigator.geolocation){
    alert('Geolocation not supported by browser')
  }else{
    point.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
    }, function(error) {
      point.removeAttr('disabled').text('Send Location');
      alert(error);
    } );
  }
});