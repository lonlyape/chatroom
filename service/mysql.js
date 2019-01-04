const mysql = require('mysql');
const mysqlConfig = require('./common/config/mysql.config.js');

var connection = mysql.createConnection(mysqlConfig);

module.exports = connection;