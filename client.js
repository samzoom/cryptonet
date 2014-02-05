//client.js
var net = require('net');
var colors = require('colors');
var color = 'green';
var colorpick = 0;

module.exports = function () {
	var user = '#';

	var client = net.connect({port:9648}, function () {
			console.log('Client connected\r\n'.green);
			console.log(client.address());
			process.stdin.resume();

			process.stdin.on('data', function (chunk) {
				if (commands.check(chunk)) {
					var com = {
						msg : chunk+'',
						user : user,
						color : color
					};
					client.write(JSON.stringify(com));
				}
			});
	});

	client.on('data', function (data) {
		data = JSON.parse(data.toString());
		console.log(eval('data.msg.' + data.color));
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
		console.log("\u001b[2J\u001b[0;0H");
		console.log('Cleared'.red);
	},
	color : function () {
		var cols = [
			'green',
			'blue',
			'red',
			'yellow',
			'white',
			'grey'
		]
		if (colorpick > 5) {
			colorpick = 0;
		}
		color = cols[colorpick++];
		console.log(('Picked ' + color + ' as the next color').yellow)
	}
}