const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('../mysql.js');
const util = require('../common/util.js');
const baseConfig = require('../common/config/base.js');
const jwt = require('jsonwebtoken');

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

//更新token
function updateToken(user, res) {
	var payload = {
		account: user.account
	};
	var token = jwt.sign(payload, baseConfig.jwt_key);
	var sql = 'UPDATE user SET token=? WHERE account=?';
	var sqlParam = [token, user.account];
	mysql.query(sql, sqlParam, function(err, resule) {
		if (err) {
			console.log(err);
		} else {
			var data = makeSendData(200, { token });
			res.send(data);
		}
	});
}

//注册
user.post('/register', upload.array(), function(req, res) {
	var body = req.body;

	checkAccount();

	//检测账号是否已经存在
	function checkAccount() {
		var checkSql = 'SELECT * FROM user WHERE account = ?';
		var sqlParam = [body.account];
		mysql.query(checkSql, sqlParam, function(err, resule) {
			if (err) {
				console.log(err);
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

	//检测用户名是否已经存在
	function checkUserName() {
		var sql = 'SELECT * FROM user WHERE user_name = ?';
		var sqlParam = [body.userName];
		mysql.query(sql, sqlParam, function(err, resule) {
			if (err) {
				console.log(err);
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
				console.log(err);
			} else {
				updateToken(body, res);
			}
		});
	}

})

//登录
user.post('/login', upload.array(), function(req, res) {
	var body = req.body;

	loginByAccount();

	//账号登录
	function loginByAccount() {
		var sql = 'SELECT * FROM user WHERE account = ?';
		var sqlParam = [body.account];
		mysql.query(sql, sqlParam, function(err, resule) {
			if (err) {
				console.log(err);
			} else {
				if (resule.length) {
					checkPasswork(resule);
				} else {
					loginByUserName();
				}
			}
		});
	}

	//用户名登录
	function loginByUserName() {
		var sql = 'SELECT * FROM user WHERE user_name = ?';
		var sqlParam = [body.account];
		mysql.query(sql, sqlParam, function(err, resule) {
			if (err) {
				console.log(err);
			} else {
				if (resule.length) {
					checkPasswork(resule)
				} else {
					var data = makeSendData(803);
					res.send(data);
				}
			}
		});
	}

	//校对密码
	function checkPasswork(resule) {
		var user = resule[0];
		if (user.password == body.password) {
			updateToken(user, res);
		} else {
			var data = makeSendData(804);
			res.send(data);
		}
	}

});

module.exports = user;