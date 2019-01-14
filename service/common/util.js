const codeMsg = require('./config/respondcode.config.js');

function makeSendData(code, data) {
	var obj = {
		code: code,
		message: codeMsg[code],
	};
	if (data) {
		obj.data = data;
	}
	var str = JSON.stringify(obj);
	console.log('[info res]', str);
	return str;
}

module.exports = {
	makeSendData: makeSendData
}