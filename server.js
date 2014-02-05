//Cryptonet, trying to make a chat application using net and crypto modules.
var net = require('net');
var client = [];
var x = 0;

module.exports = function () {
	server = net.createServer(function (c) {
		client[x++] = c;

		sendAll('[SERVER] User connected to the session : ');

		c.on('end', function () {
			console.log('[SERVER] Connection stopped');
		});

		c.on('data', function (data) {
			sendAll(JSON.parse(data));
		});
		
		// c.pipe(c);
	}).listen(9648);
}

function sendAll(str) {
	for (i = 0; i < client.length; i++) {
		if (typeof str == 'string') {
			var obj = {
				msg : str,
				color : 'yellow'
			}
			client[i].write(JSON.stringify(obj));
		}
		else {
			var obj = {
				msg : str.user + ' : ' + str.msg,
				color : str.color
			}
			client[i].write(JSON.stringify(obj))
		}

	}
}