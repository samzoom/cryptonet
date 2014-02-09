#!/usr/bin/env node

var crypt = require('./crypt.js');

var swag = crypt.encrypt('This is a lot more swag than you can imagine','aes192','swag');
console.log(swag);

var unswag = crypt.decrypt(swag, 'aes192', 'swag');
console.log(unswag);