var socket = io();

socket.on('connect', function(){
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err){
    if(err){
      alert(err);
      window.location.href = "/";
    }
  });

});

socket.on('newMessage', function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');    
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    from : message.from,
    text : message.text,
    createdAt : formatedTime
  });
  $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from : message.from,
    text : message.text,
    createdAt : formatedTime 
  });
  $('#messages').append(html);
  point.removeAttr('disabled').text('Send Location'); 
});

socket.on('updateUserList', user => {
  var ol = $('<ol></ol>');
  user.forEach( user => {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

$('#message-form').on('submit', function (event) {
  
  event.preventDefault();
  socket.emit('createMessage', {
    text : $('input[name=message]').val(),
  }, function(){
    $('input[name=message]').val('');    
  });

});

var point = $('#send-location');
point.on('click', function(e) {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser')
  }else{
    point.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
      socket.emit('createLocationMessage',{
        latitude : position.coords.latitude,
        longitude : position.coords.longitude
      });
    }, function(error) {
      point.removeAttr('disabled').text('Send Location');
      alert('Unable to get Location, try again');
    } );
  }
});