/**
 *检查 token 中间件
 **/

const mysql = require('../mysql.js');
const util = require('../common/util.js');
const noTokenConfig = require('../common/config/notoken.config.js');

var makeSendData = util.makeSendData;

module.exports = function(req, res, next) {
	var body = req.body;

	var needToken = !noTokenConfig[req._parsedUrl.pathname];
	if (needToken) {
		var sql = 'SELECT id FROM user_base WHERE token = ?';
		var sqlParam = [body.token];

		mysql.query(sql, sqlParam).then(function(rows) {
			if (rows.length) {
				next();
			} else {
				var data = makeSendData(803);
				res.send(data);
			}
		});
	} else {
		next();
	}
}