var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '47.106.200.71',
	user: 'root',
	password: 'root',
	database: 'lonlyape'
});

connection.connect();

var sql = 'INSERT INTO user(name,sex) VALUES(?,?)';
var sqlParams = [
	'符东伟',
	0
];

connection.query(sql, sqlParams, function(err, resule) {
	if (err) {
		console.log('[INSERT ERROR] - ', err.message);
		return;
	}

	console.log('------------- INSERT ------------');
	console.log('INSERT :', resule);
	console.log('---------------------------------\n\n');
});