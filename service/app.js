const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const checkToken = require('./middleware/token.js');

var user = require('./router/user.js');
var chat = require('./router/chat.js');
var socket = require('./sockect.js');

var upload = multer();

var app = express();

app.get('/', function(req, res) {
	res.location('/index.html?#/42324389-351e-42ab-baef-0238e8e43c73/home');
	res.send(302);
});

//post req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.array(), function(req, res, next) {
	/*
	 *打印请求日志
	 */
	console.log('\nTime:', Date.now());
	console.log('[info url]', req._parsedUrl.pathname);
	console.log('[info body]', JSON.stringify(req.body));

	res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(checkToken); //检查 token 中间件

app.use(express.static('public'));

app.use('/user', user);
app.use('/chat', chat);

var sever = app.listen(8081, function() {
	var port = sever.address().port;
	console.log('listen on port %d', port);

	// webSocket 启动
	socket(8082);
});