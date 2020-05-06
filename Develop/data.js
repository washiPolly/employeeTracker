const connection = require("./connection");
const cTable = require('console.table');

class Data {
    constructor (connection){
        this.connection = connection;
        console.log("MySQL connected")
    };
    viewEmployees() {
        return this.connection.query("SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.dept_id = department.dept_id LEFT JOIN employee manager on manager.manager_id = employee.manager_id;")
    };
    viewDepartment(){
        return this.connection.query("SELECT employee.employee_id, CONCAT(employee.first_name, ' ' , employee.last_name) AS employee, department.name AS department FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.dept_id = department.dept_id") 
    };
    viewManager(){
        return this.connection.query("SELECT employee.employee_id, CONCAT(employee.first_name, ' ' , employee.last_name) AS employee, role.title, department.name as department FROM employee LEFT JOIN role on employee.role_id = role.role_id LEFT JOIN department on role.dept_id = department.dept_id WHERE employee.employee_id IN (1,3,5)")
    };
    displayRole(){
        return this.connection.query("SELECT role.role_id, role.title FROM role")
    };
    addEmployeeDb(answer) {
        return this.connection.query("INSERT INTO employee SET ?", answer)
        // return connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", 
        // [answer.firstName, answer.lastName, answer.role_id, answer.manager_id])
     };
    removeEmployeeDb(answer) {
        return this.connection.query("DELETE FROM employee WHERE employee_id = ?", answer)
     };
    updateRoleDb(employee_id, role_id) {
        this.connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?", [role_id, employee_id])
    };
    updateManagerDb(employee_id, manager_id) {
        this.connection.query("UPDATE employee SET manager_id = ? WHERE employee_id = ?", [manager_id,employee_id])
    };

    }

module.exports = new Data(connection);