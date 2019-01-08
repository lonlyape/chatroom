const mysql = require('mysql');
const mysqlConfig = require('./common/config/mysql.config.js');




module.exports.query = function(sql, sqlParam) {
	return new Promise(function(resolve, reject) {
		var connection = mysql.createConnection(mysqlConfig);
		connection.connect();

		connection.query(sql, sqlParam, function(error, rows) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('[info rows]', JSON.stringify(rows));
				resolve(rows);
			}
		});

		connection.end();
	});
}