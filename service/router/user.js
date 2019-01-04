const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('../mysql.js');
const util = require('../common/util.js');

var upload = multer();
var makeSendData = util.makeSendData;

var user = express.Router();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: true }));

user.use(function(req, res, next) {
	res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

user.post('/register', upload.array(), function(req, res) {
	var body = req.body;
	// mysql.connect();

	checkAccount();

	function checkAccount() {
		var checkSql = 'SELECT * FROM user WHERE account = "' + body.account + '"';
		mysql.query(checkSql, '', function(err, resule) {
			if (err) {
				throw err;
			} else {
				if (resule.length) {
					var data = makeSendData(801);
					res.send(data);
				} else {
					checkUserName();
				}
			}
		});
	}

	function checkUserName() {
		var sql = 'SELECT * FROM user WHERE user_name = "' + body.userName + '"';
		mysql.query(sql, '', function(err, resule) {
			if (err) {
				throw err;
			} else {
				if (resule.length) {
					var data = makeSendData(802);
					res.send(data);
				} else {
					register();
				}
			}
		});
	}

	//注册
	function register() {
		var sql = 'INSERT INTO user(account,user_name,name,sex,password) VALUE(?,?,?,?,?)';
		var sqlParam = [body.account, body.userName, body.name, body.sex, body.password];
		mysql.query(sql, sqlParam, function(err, resule) {
			if (err) {
				throw err;
			} else {
				var data = makeSendData(200);
				res.send(data);
			}
		});
	}

	// mysql.end();
})

module.exports = user;