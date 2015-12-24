var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user connect to socket io');

	socket.emit('message', {
		text: 'welcome to chat app'
	});

	socket.on('message', function (message){
		console.log('message received: '+ message.text);

		socket.broadcast.emit('message', message);
	})

})

http.listen(PORT, function() {
	console.log('Server started');
});