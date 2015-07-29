/*
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');

hello();
gb.goodbye();

require('./custom_goodbye').goodbye();
*/

//var makeRequest = require('./make_request');
var makeRequest = require('make_request');

makeRequest("Here's looking at you, kid.");