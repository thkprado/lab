var express = require('express');
var url = require('url');
var http = require('http');

var app = express();
//var server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/views');
app.set('x-powered-by', false);


app.get('/', function(request, response) {
	response.sendFile(__dirname + "/index.html");
});

app.get('/tweets/:username', function(req, response) {
	var username = req.params.username;
	//console.log(username);
	options = {
		protocol: "https:",
		host: 'api.twitter.com',
		pathname: '/1.1/statuses/user_timeline.json',
		query: { screen_name: username, count: 10 }
	}
	//console.log(options);
	var twitterUrl = url.format(options);
	//console.log(twitterUrl);
	/*
	req(twitterUrl, function(err, res, body) {
		var tweets = JSON.parse(body);
		response.render('tweets.ejs', { tweets: tweets, name: username });
	});
	*/
	var tweets = [
		{ text: "teste1" },
		{ text: "teste2" },
		{ text: "teste3" },
	];
	
	response.render('tweets.ejs', { layout: 'layout.ejs', tweets: tweets, name: username });
});

/*
app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
*/
app.listen(8080);


// curl -s http://localhost:8080/tweets/eallam