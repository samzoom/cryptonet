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
			delete client[c.id];
			rebuildClients();
		})
	}).listen(9648);
}

function rebuildClients() {
	var clients = 0;
	var newClients = [];
	for (i = 0; i < client.length; i++) {
		if (client[i] != undefined) {
			newClients[clients++] = client[i];
		}
	}
	delete client;
	client = newClients;
	x = client.length;
}