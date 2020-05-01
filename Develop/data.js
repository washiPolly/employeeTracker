const connection = require("./connection");
const cTable = require('console.table');

class Data {
    constructor (connection){
        this.connection = connection;
        console.log("MySQL connected");
    }
    viewEmployees() {
           return this.connection.query("SELECT * FROM employee");

            
    };
}



module.exports = new Data(connection);