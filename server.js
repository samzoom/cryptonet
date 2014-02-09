//Cryptonet, trying to make a chat application using net and crypto modules.
var net = require('net');
var client = [];
var x = 0;

module.exports = function () {
	server = net.createServer(function (c) {
		client[x++] = c;
		getUser(c);
		// sendAll();

		c.on('end', function () {
			console.log('[SERVER] Connection stopped');
		});

		c.on('data', function (data) {
			data = JSON.parse(data);
			if (data.msg == 'cmd') {
				sendAll('[SERVER] Somebody entered : ' + data.cmd);
			}
			else {
				sendAll(data);
			}
			
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
			};
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

function getUser(c) {
	c.write(JSON.stringify({msg:'cmd',cmd:'getuser'}))
}