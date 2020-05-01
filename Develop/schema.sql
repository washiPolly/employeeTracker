-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS empTracker_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE empTracker_db;

USE empTracker_db;

CREATE TABLE department (
  dept_id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

CREATE TABLE role (
  role_id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary INT(30) NOT NULL,
  dept_id INT,
  PRIMARY KEY (role_id),
  CONSTRAINT department FOREIGN KEY (dept_id)
  REFERENCES department(dept_id)
);

CREATE TABLE employee (
  employee_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  PRIMARY KEY (employee_id),
  CONSTRAINT role FOREIGN KEY (role_id)
  REFERENCES role(role_id),
  manager_id INT (11)
);

INSERT INTO department (name) 
VALUES ('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, dept_id)
 VALUES ('Sales Lead',10000, 1),
 ('Salesperson',8000, 1),
 ('Lead Engineer',15000, 2),
 ('Sofware Engineer',12000, 2),
 ('Accountant',12500, 3),
 ('Legal Tem Lead',25000, 4),
 ('Lawyer',19000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Michael','Scott',1,null),
('Dwight','Schrute',2,3),
('Jim','Halper',2,1),
('Pam','Halper',2,3),
('Angela','Austin',5,1),
('Oscar','Martinez',5,5),
('Creed','Bratten',6,null),
('Kevin','Malone',5,5);
