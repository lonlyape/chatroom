const codeMsg = require('./config/respondcode.config.js');

function makeSendData(code, data) {
	var obj = {
		code: code,
		message: codeMsg[code],
	};
	if (data) {
		obj.data = data;
	}
	return JSON.stringify(obj);
}

module.exports = {
	makeSendData: makeSendData
}