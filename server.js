var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('user connect to socket io');

	socket.emit('message', {
		text: 'welcome to chat app',
		time: ''
	});

	socket.on('message', function (message){
		console.log('message received: '+ message.text);

		var timeX = now.valueOf();
		var timeStamp = moment.utc(timeX).local().format('MMM Do YYYY, h:mma');

		message.time = timeStamp;

		socket.broadcast.emit('message', message);
	})

})

http.listen(PORT, function() {
	console.log('Server started');
});