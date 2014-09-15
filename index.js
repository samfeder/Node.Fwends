var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("a user connected");

  socket.on('type status', function(data){
    socket.broadcast.emit('type status', data)
  })

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('chat message', "user disconnected")
  })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});