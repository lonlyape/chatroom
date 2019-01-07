// import express from 'express';
const express = require('express');
var user = require('./router/user')
const bodyParser = require('body-parser');
const multer = require('multer');

var upload = multer();

var app = express();

app.get('/', function(req, res) {
	res.location('/index.html?#/42324389-351e-42ab-baef-0238e8e43c73/home');
	res.send(302);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array(), function(req, res, next) {
	console.log('\nTime:', Date.now());
	console.log('[info url]', req._parsedUrl.pathname);
	console.log('[info body]', req.body);
	next();
});

app.use(express.static('public'));

app.use('/user', user);

var sever = app.listen(8081, function() {
	console.log('listen on port %d', sever.address().port);
});