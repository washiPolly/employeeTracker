const inquirer = require("inquirer");
const mysql = require("mysql");
require('console.table');

const connection = require("./develop/connection");
const data = require("./develop/data");


start();

function start() {
    inquirer.prompt([{
            type: "list",
            name: "choices",
            message: "What would you like to do? (Use arrow keys)",
            choices: 
            [
                "View All Employees", 
                "View All Employees By Department",
                "View All Employees By Manager", 
                "Add Employee", 
                "Remove Employee",
                "Update Employee Role", 
                "Update Employee Manager",
                "Exit"
            ],
        }, 
    ])
        .then(function(answer){
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();                 
                    break;
                case "View All Employees By Department":
                    ByDept();
                    break;
                case "View All Employees By Manager":
                    ByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Update Employee Manager":
                    updateManager();
                    break;
                case "Exit":
                    connection.end();
                    break;

            }
        });

}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name",
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role? (Use arrow keys)",
            choices: [
                "Sales Lead",
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead"
        ]
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager? (Use arrow keys)",
            //not sure how to show results from database here as the choices
            choices: [
                "Polly Su",
                "Jason Wong",
                "Mason White",
                "Harper Black"
        ]
        },
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role, manager) VALUES (?)", [answer.firstName, answer.lastName, answer.role], function(err,res){
            if(err){
                throw err
            }
            start();
     
    }) 
})
}

function removeEmployee(){
    inquirer.prompt([
        {
            type: "list",
            name: "removeEmployee",
            message: "Which employee would you like to remove?",
            choices: 
            [

            ]
        },
        
    ])
    .then(function(answer) {
        connection.query("DELETE FROM employee WHERE first_name = ? Where last_name = ?", [answer.removeEmployee], function(err,res){
            if(err){
                throw err
            }
            start();
     
    }) 
})
}

function updateRole(){
    inquirer.prompt([
        {
            type: "list",
            name: "updateRole",
            message: "Which employee role would you like to update?",
            choices: 
            [
              
        ]
        },
        
    ])
    .then(function(answer) {
        connection.query("UPDATE FROM employee SET role = ?", [answer.updateRole], function(err,res){
            if(err){
                throw err
            }
            start();
     
    }) 
})
}

function updateManager(){
    inquirer.prompt([
        {
            type: "list",
            name: "updateManager",
            message: "Which employee manager would you like to update?",
            choices: 
            [
              
        ]
        },
        
    ])
    .then(function(answer) {
        connection.query("UPDATE FROM employee SET manager = ?", [answer.updateManager], function(err,res){
            if(err){
                throw err
            }
            start();
     
    }) 
})
}

async function allEmployees(){
        const viewEmp = await data.viewEmployees();
        console.log(viewEmp);
        start();
    }


function ByDept(){
    connection.query("SELECT * FROM department", function(err,res){
        if (err) throw err;
        console.table([res]);
        start();
    })
}

function ByManager(){
    connection.query("SELECT * FROM role", function(err,res){
        if (err) throw err;
        console.table([res]);
        start();
        
    })
};

//connection.end();