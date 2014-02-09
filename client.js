//client.js
var net = require('net');
var crypt = require('./crypt.js')
var colors = require('colors');
var color = 'green';
var colorpick = 0;

module.exports = function () {
	console.log('Please fill in your username :');
	var event = process.stdin.on('data', setup);
}

function startClient(user) {
	var client = net.connect({port:9648}, function () {
		console.log('Client connected'.green);
		console.log(client.address());
		process.stdin.resume();

		process.stdin.on('data', function (chunk) {
			if (commands.check(chunk)) {
				var com = {
					msg : crypt.encrypt(chunk+'', 'aes192','swag'),
					user : user.split('\n')[0],
					color : color
				};
				console.log(JSON.stringify(com));
				client.write(JSON.stringify(com));
			}
		});
	});

	client.on('data', function (data) {
		data = JSON.parse(data.toString());
		if (data.msg != 'cmd') {
			console.log(eval("crypt.decrypt(data.msg, 'aes192', 'swag')." + data.color));
		}
		else {
			if (data.cmd == 'getuser') {
				client.write(JSON.stringify({msg:'cmd',cmd:user}));	
			}
		}
	});
}

function setup (chunk) {
	var user = chunk+'';
	this.removeListener('data', setup);
	startClient(user);
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