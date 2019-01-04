// import express from 'express';
const express = require('express');
var user = require('./router/user')

var app = express();

app.get('/', function(req, res) {
	res.location('/index.html?#/42324389-351e-42ab-baef-0238e8e43c73/home');
	res.send(302);
});

app.use(express.static('public'));

app.use('/user', user);

var sever = app.listen(8081, function() {
	console.log('listen on port %d', sever.address().port);
});