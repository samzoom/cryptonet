//client.js
var net = require('net');
var readline = require('readline');
var colors = require('colors');

module.exports = function () {

	var client = net.connect({port:9648}, function () {
			console.log('Client connected\r\n'.green);
			console.log(client.address());
			process.stdin.resume();

			process.stdin.on('data', function (chunk) {
				if (commands.check(chunk)) {
					client.write(chunk);
				}
			});
	});

	client.on('data', function (data) {
		console.log((data.toString()).yellow);
	});
}

var commands = {
	check : function (cmd) {
		try {
			if (eval('commands.' + cmd)) {
				eval('commands.' + cmd)();
				return false;
			}
			else {
				return true;
			}
		} catch (err) {return true}
	},
	memory : function () {
		console.log(process.memoryUsage());
	},
	uptime : function () {
		console.log(Math.floor(process.uptime() * 10) / 10 + 's');
	},
	clear : function () {
		console.log('\033[2J');
	}
}