const express = require('express');
const mysql = require('../mysql.js');
const util = require('../common/util.js');

var makeSendData = util.makeSendData;

var chat = express.Router();

chat.use(function(req, res, next) {
	next();
});

module.exports = chat;

/*
 *param={
 *	token:String
 *}
 */
chat.post('/temporary', function(req, res) {
	var body = req.body;

	var sql = 'SELECT t1.id, t1.from_id fromId, t1.to_id toId, t1.content msg FROM chat_temporary t1 JOIN user_base t2 ON t1.to_id=t2.id WHERE t2.token= ?';
	var sqlParam = [body.token];
	mysql.query(sql, sqlParam).then(function(rows) {
		var data = makeSendData(200, rows);
		res.send(data);
	});
});

/*
 *param={
 *	ids:String(1,2,3)
 *}
 */
chat.post('/temporary/delete', function(req, res) {
	var body = req.body;

	var ids = body.ids.split(',');

	var sql = 'DELETE FROM chat_temporary WHERE id IN (?)';

	var qN = '';
	for (var i = 0; i < ids.length; i++) {
		qN += '?,';
	}
	qN = qN.replace(/,$/, '');

	sql = sql.replace('?', qN);

	var sqlParam = ids;
	mysql.query(sql, sqlParam).then(function(rows) {
		var data = makeSendData(200);
		res.send(data);
	});
});

/*
 *param={
 *	token:String,
 *	fromTime:Number
 *}
 */
chat.post('/getChatList', function(req, res) {
	var body = req.body;

	var sql = 'SELECT t1.from_id fromId, t1.to_id toId, t1.content msg, DATE_FORMAT(t1.time_created,"%Y-%c-%d %T") createdTime FROM chat_content t1 JOIN user_base t2 ON (t2.id=t1.from_id OR t2.id=t1.to_id) WHERE unix_timestamp(t1.time_created) > ? AND t2.token=? ORDER BY unix_timestamp(t1.time_created)';
	var sqlParam = [body.fromTime, body.token];
	mysql.query(sql, sqlParam).then(function(rows) {
		var data = makeSendData(200, rows);
		res.send(data);
	});
});