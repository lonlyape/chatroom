const express = require('express');
const mysql = require('../mysql.js');
const util = require('../common/util.js');

var makeSendData = util.makeSendData;

var chat = express.Router();

chat.use(function(req, res, next) {
	next();
});

module.exports = chat;

chat.post('/temporary', function(req, res) {
	var body = req.body;

	var sql = 'SELECT t1.id, t1.from_id fromId, t1.to_id toId, t1.content msg FROM chat_temporary t1 JOIN user_base t2 ON t1.to_id=t2.id WHERE t2.token= ?';
	var sqlParam = [body.token];
	mysql.query(sql, sqlParam).then(function(rows) {
		var data = makeSendData(200, rows);
		res.send(data);
	});
});