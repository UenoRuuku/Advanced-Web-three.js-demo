var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http,{
  cors: {
    // origin: "http://127.0.0.1:2233",
    // methods: ["GET", "POST"]
//   }
});

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    console.log('client '+ socket.id + ' connected');
    socket.on('player', function (data) {
      	data.socketid = socket.id;
        socket.broadcast.emit('player', data);
    });
    socket.on('disconnect', function () {
        console.log('client ' + socket.id + ' disconnected');
      	socket.broadcast.emit('offline', {socketid: socket.id});
    })
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});
