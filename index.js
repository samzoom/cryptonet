//Wrapper for cryptonet

if (process.argv[2] == 'client') {
	require('./client.js')();
}
else if (process.argv[2] == 'server') {
	require('./server.js')();
}
else {
	require('./server.js')();
	require('./client.js')();
}