var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
	var newFile = fs.createWriteStream("readme_copy.md");
	request.pipe(newFile);
	
	request.on('end', function() {
		response.end('uploaded!');
	});
}).listen(8080);

console.log('Listening on port 8080...');

// curl --upload-file readme.md http://localhost:8080