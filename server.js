//Cryptonet, trying to make a chat application using net and crypto modules.
var net = require('net');
var client = [];
var x = 0;

module.exports = function () {
	server = net.createServer(function (c) {
		c.id = x;
		client[x++] = c;
		c.on('data', function (data) {
			for (i = 0; i < client.length; i++) {
				client[i].write(data);
			}
		});
		c.on('end', function () {
			console.log(client + '')
			delete client[c.id];
			console.log(client + '')
		})
	}).listen(9648);
}