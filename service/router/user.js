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

user.use(function(req, res, next) {
	next();
});

module.exports = user;


//更新token
function updateToken(user, res) {
	var payload = {
		account: user.account
	};
	var token = jwt.sign(payload, baseConfig.jwt_key);
	var sql = 'UPDATE user_base SET token=? WHERE account=?';
	var sqlParam = [token, user.account];
	mysql.query(sql, sqlParam).then(function(rows) {
		var data = makeSendData(200, { token });
		res.send(data);
	});
}

//注册
user.post('/register', function(req, res) {
	var body = req.body;

	checkAccount();

	//检测账号是否已经存在
	function checkAccount() {
		var sql = 'SELECT * FROM user_base WHERE account = ?';
		var sqlParam = [body.account];
		mysql.query(sql, sqlParam).then(function(rows) {
			if (rows.length) {
				var data = makeSendData(801);
				res.send(data);
			} else {
				checkUserName();
			}
		});
	}

	//检测用户名是否已经存在
	function checkUserName() {
		var sql = 'SELECT * FROM user_base WHERE user_name = ?';
		var sqlParam = [body.userName];
		mysql.query(sql, sqlParam).then(function(rows) {
			if (rows.length) {
				var data = makeSendData(802);
				res.send(data);
			} else {
				register();
			}
		});
	}

	//注册
	function register() {
		var sql = 'INSERT INTO user_base(account,user_name,name,sex,password,time_create,time_update) VALUE(?,?,?,?,?,NOW(),NOW())';
		var sqlParam = [body.account, body.userName, body.name, body.sex, body.password];
		mysql.query(sql, sqlParam).then(function(rows) {
			updateToken(body, res);
		});
	}

})

//登录
user.post('/login', function(req, res) {
	var body = req.body;

	loginByAccount();

	//账号登录
	function loginByAccount() {
		var sql = 'SELECT * FROM user_base WHERE account = ?';
		var sqlParam = [body.account];
		mysql.query(sql, sqlParam).then(function(rows) {
			if (rows.length) {
				checkPasswork(rows);
			} else {
				loginByUserName();
			}
		});
	}

	//用户名登录
	function loginByUserName() {
		var sql = 'SELECT * FROM user_base WHERE user_name = ?';
		var sqlParam = [body.account];
		mysql.query(sql, sqlParam).then(function(rows) {
			if (rows.length) {
				checkPasswork(rows);
			} else {
				var data = makeSendData(803);
				res.send(data);
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

//获取用户信息
user.post('/getUserInfo', function(req, res) {

	var body = req.body;

	getBaseInfo();

	function getBaseInfo() {
		var sql = 'SELECT id, user_name as userName, sex FROM user_base WHERE token = ?';
		var sqlParam = [body.token];
		mysql.query(sql, sqlParam).then(function(rows) {
			var data = makeSendData(200, rows[0]);
			res.send(data);
		});
	}

});

//好友列表
user.post('/frindeList', function(req, res) {

	var body = req.body;

	getFrindeList()

	function getFrindeList() {
		var sql = 'SELECT t3.id, t3.user_name as userName, t3.sex FROM user_base t1 JOIN user_relationship t2 ON t1.id = t2.id_apply JOIN user_base t3 ON t3.id = t2.id_reply WHERE t2.status IN (1,3,6) AND t1.token = ? UNION SELECT t3.id, t3.user_name as userName, t3.sex FROM user_base t1 JOIN user_relationship t2 ON t1.id = t2.id_reply JOIN user_base t3 ON t3.id = t2.id_apply WHERE t2.status IN (1,2,5) AND t1.token = ?';
		var sqlParam = [body.token, body.token];
		mysql.query(sql, sqlParam).then(function(rows) {
			var data = makeSendData(200, rows);
			res.send(data);
		});
	}
});