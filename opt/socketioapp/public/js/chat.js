window.onload = function() {

	var messages = [];
	var socket = io.connect('http://localhost:8080');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data) {
		console.log("Mensagem recebida");
		console.log(data);
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log("There is a problem:", data);
		}
	});

	var sendMessage = function() {
		if (name.value == "") {
			alert("Please type your name!");
			return;
		}
		var text = field.value;
		socket.emit('send', { message: text, username: name.value });
		console.log("Mensagem enviada");
		field.value = "";
	};

	sendButton.onclick = sendMessage;

	field.onkeyup = function(e) {
		if (e.keyCode == 13) {
			sendMessage();
		}
	};
}