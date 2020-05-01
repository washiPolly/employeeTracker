const mysql = require("mysql");
const util = require('util');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pollyServer1",
    database: "empTracker_db"
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;