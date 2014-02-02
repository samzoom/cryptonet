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
			sendAll(data);
		});



		c.write('You connected to the server.\r\n');
		// c.pipe(c);
	}).listen(9648);
}

function sendAll(str) {
	for (i = 0; i < client.length; i++) {
		client[i].write(str)
	}
}