const inquirer = require("inquirer");
const mysql = require("mysql");
var figlet = require('figlet');
require('console.table');


const connection = require("./develop/connection");
const data = require("./develop/data");

init();

async function init(){

    figlet('Employee Tracker', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        start(); 

    });
}



function start() {
    inquirer.prompt([{
            type: "list",
            name: "action",
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



async function addEmployee(){
    let roles = await data.displayRole();
    const roleChoices = roles.map(({ role_id, title }) => ({
        name: title,
        value: role_id
      }));
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices 
        
        },
        {
            type: "input",
            name: "manager_id",
            message: "Enter employee Manager ID if applicable",
                    
        },

        
    ])
    .then(function(answer) {
        data.addEmployeeDb(answer);
        console.log("Employee has been added to the System")

            start();
     
    }) 

}

async function removeEmployee(){
    let getEmployeeList = await data.viewEmployees();
    const employeeList = getEmployeeList.map(({ first_name, last_name, employee_id }) => ({
        name: first_name + ' ' + last_name,
        value: employee_id
      }));
    inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which employee would you like to remove?",
            choices: employeeList
            
        }
        
    ])
     .then(function(employee_id) {
            var id = employee_id.employee_id;
            data.removeEmployeeDb(id);
            console.log("Employee has been removed from the System")
            
            start();
     
    }) 

}




async function updateRole(){
    
    let getEmployeeList = await data.viewEmployees();
    const employeeList = getEmployeeList.map(({ first_name, last_name, employee_id }) => ({
        name: first_name + ' ' + last_name,
        value: employee_id
      }));

      let roles = await data.displayRole();
    const roleChoices = roles.map(({ role_id, title }) => ({
        name: title,
        value: role_id
      }));
    
   

    await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which Employee would you like to update?",
            choices: employeeList
        },
       
    {
        type: "list",
        name: "role_id",
        message: "Which new Role would you like to assign the Employee?",
        choices: roleChoices
    }
])

    .then(function(answers) {
        let role_id = answers.role_id;
        let employee_id = answers.employee_id;
        //employee.role_id = roleId;


        // console.log(role_id);
        // console.log(employee_id);
        //let employeeID = employee_id.employee_id;
        
        // let roleID = role_id.role_id;
        
        data.updateRoleDb(employee_id, role_id);
        console.log("Employee Role has been updated")
            start();
     
    }) 
}


async function updateManager(){
    let getEmployeeList = await data.viewEmployees();
    const employeeList = getEmployeeList.map(({ first_name, last_name, employee_id }) => ({
        name: first_name + ' ' + last_name,
        value: employee_id
      }));

      let managers = await data.viewManager();
    const managerChoices = managers.map(({ employee, manager_id }) => ({
        name: employee,
        value: manager_id
      }));
    inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which Employee Manager would you like to update?",
            choices: employeeList
          
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the new Manager for the Employee",
            choices: managerChoices
          
        },
    ])
    .then(function(answers) {
        let employee_id = answers.employee_id;
        let manager_id = answers.manager_id;
        data.updateManagerDb(employee_id, manager_id);
        console.log(employee_id);
        console.log(manager_id);
        console.log("Employee Manager has been updated")
            
            start();
     
    }) 
}


async function allEmployees(){
        const viewEmp = await data.viewEmployees();
        console.table(viewEmp);
        start();
    }


async function ByDept(){
        const viewDept = await data.viewDepartment();
        console.table(viewDept);
        start();
    }
   

async function ByManager(){
    const viewManager = await data.viewManager();
    console.table(viewManager);
        start();
        };

