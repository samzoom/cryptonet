//client.js
var net = require('net');
var crypt = require('./crypt.js')
var colors = require('colors');
var color = 'green';
var client;
var user;
var ip;
var setuptimes=0;

var passwd = 'default';

module.exports = function () {
	console.log('Please fill in your username :');
	process.stdin.on('data', setup);
}

function startClient() {
	client = net.connect({
		port:parseInt(ip.split(':')[1]),
		host:ip.split(':')[0]
	}, function () {
		console.log(('Client connected on ' + ip).green);
		process.stdin.resume();

		process.stdin.on('data', function (chunk) {
			if (commands.check(chunk)) {
				var com = {
					msg : crypt.encrypt(chunk+'', 'aes192', passwd),
					user : user.split('\n')[0],
					color : color
				};
				client.write(JSON.stringify(com));
			}
		});
	});

	client.on('data', function (data) {
		data = JSON.parse(data.toString());
		if (data.msg != 'cmd') {
			console.log(eval("crypt.decrypt(data.msg, 'aes192', '" + passwd + "')." + data.color));
		}
	});
}

function setup (chunk) {
	setuptimes++;
	if (setuptimes == 1) {
		user = chunk.toString().replace(/\n/g, '');
		console.log("\u001b[2J\u001b[0;0H");
		console.log('Please insert ip and port (ip:port -> localhost:9648)')
	}
	else {
		ip = chunk.toString().replace(/\n/g, '');
		if (ip.length<3) ip = 'localhost:9648';
		this.removeListener('data', setup);
		startClient();
	}
}

var commands = {
	check : function (cmd) {
		cmd = cmd.toString().replace(/\r/g,'').replace(/\n/g,'').split(' ');
		try {
			if (eval('commands.' + cmd[0])) {
				eval('commands.' + cmd[0])(cmd);
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
	},
	color : function (arg) {
		var poscol = {
			green:true,
			blue:true,
			red:true,
			yellow:true,
			grey:true,
			black:true,
			white:true
		}

		if (!arg[1]) console.log("You haven't selected a color");
		else {
			if (eval('poscol.' + arg[1])) {
				color = arg[1];
				console.log(('Picked ' + color + ' as the next color').yellow)
			}
			else {
				console.log('Color wasn\'t found.')
			}
		}

	},
	password : function (arg) {
		passwd = arg[1];
		console.log('Password is set to : ' + arg[1]);
	},
	exit : function () {
		var obj = {
			msg : crypt.encrypt(user + ' left the server.', 'aes192', passwd),
			user : user,
			color : color
		}
		client.write(JSON.stringify(obj), function () {
			console.log('Thank you for using Cryptnet!'.red);
			client.end();
			commands.clear();
			console.log('Press any button to crash cryptonet.')
		});

	}
}