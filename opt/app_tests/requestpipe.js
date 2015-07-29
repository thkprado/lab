var http = require('http');

http.createServer(function(request, response) {
	response.writeHead(200);
	/*
	request.on('data', function(chunk) {
		response.write(chunk.toString());
	});
	
	request.on('end', function() {
		response.end();
	});
	*/
	request.pipe(response);
}).listen(8080);

console.log('Listening on port 8080...');

// curl -d 'hello' http://localhost:8080