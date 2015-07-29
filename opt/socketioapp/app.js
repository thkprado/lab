var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.set('x-powered-by', false);
app.use(express.static(__dirname + '/public'));
//app.engine('jade', require('jade').__express);

app.get("/jade", function(req, res){
	res.render("pagejade.jade");
});

app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/index.html');
	res.render("page");
});

app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log('Client connected...');
	socket.emit('message', { message: 'welcome to the chat' });
	socket.on('send', function (data) {
		io.sockets.emit('message', data);
	});
});
