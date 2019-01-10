const webSocket = require('ws').Server;
const hashMap = require('hashmap');

// record the client
var userConnectionMap = new hashMap();
var connectNum = 0;


module.exports = function(port) {

	var webSocketServer = new webSocket({ port: port });

	webSocketServer.on('connection', function(ws) {
		++connectNum;
		console.log('A client has connected. current connect num is : ' + connectNum);
		ws.on('message', function(message) {
			var objMessage = JSON.parse(message);
			console.log(JSON.stringify(objMessage));

			var strType = objMessage['type'];

			switch (strType) {
				case 'create':
					userConnectionMap.set(objMessage['from'], ws);
					break;
				default:
					var targetConnection = userConnectionMap.get(objMessage['to']);
					if (targetConnection) {
						targetConnection.send(message);
					}
			}
		});

		ws.on('close', function(message) {
			var objMessage = JSON.parse(message);
			userConnectionMap.remove(objMessage['from']);
			--connectNum;
			console.log('A client has remove. current connect num is : ' + connectNum);
		});
	});
}