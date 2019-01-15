const webSocket = require('ws').Server;
const hashMap = require('hashmap');
const mysql = require('./mysql.js');

// 管理 socket 连接
var userConnectionMap = new hashMap();

/*
 *to_id 不在线时才需要
 *保存发送信息到 chat_temporary 表
 */
function saveTemporaryMsg(obj) {
	var sql = 'INSERT INTO chat_temporary(from_id,to_id,content,time_created) VALUE(?,?,?,NOW())';
	var sqlParam = [obj.fromId, obj.toId, obj.msg];
	mysql.query(sql, sqlParam).then(function(rows) {
		console.log('[info sockectSave]', JSON.stringify(rows));
	});
}

/*
 *保存聊天内容
 *
 */
function saveMsg(obj) {
	var sql = 'INSERT INTO chat_content(from_id,to_id,content,time_created) VALUE(?,?,?,NOW())';
	var sqlParam = [obj.fromId, obj.toId, obj.msg];
	mysql.query(sql, sqlParam).then(function(rows) {
		console.log('[info sockectSave]', JSON.stringify(rows));
	});
}

module.exports = function(port) {

	var webSocketServer = new webSocket({ port: port });

	webSocketServer.on('connection', function(ws) {
		ws.on('message', function(message) {
			var objMessage = JSON.parse(message);
			console.log('[info sockectMessage]', JSON.stringify(objMessage));

			var strType = objMessage['type'];

			switch (strType) {
				case 'create':
					userConnectionMap.set(objMessage.fromId, ws);
					ws.fromId = objMessage.fromId;
					console.log('[info socketLine] A client has connected. current connect num is : ' + userConnectionMap.count());
					break;
				default:
					saveMsg(objMessage);
					var targetConnection = userConnectionMap.get(objMessage.toId);
					if (targetConnection) {
						targetConnection.send(message);
					} else {
						saveTemporaryMsg(objMessage);
					}
			}
		});

		ws.on('close', function(message) {
			userConnectionMap.remove(ws.fromId);
			console.log('[info socketLine] A client has remove. current connect num is : ' + userConnectionMap.count());
		});
	});
}