var http = require('http');

var server = http.createServer();
server.on('request', function(request, response) {
	response.writeHead(200);
	response.write("Hello, this is dog.");
	response.end();
});

server.on('close', function(){
	console.log("Server close event...");
});

server.listen(8080);

console.log('Listening on port 8080...');

server.emit('close');