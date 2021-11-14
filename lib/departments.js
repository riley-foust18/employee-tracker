const db = require("../db/connection");
const cTable = require('console.table');
const inquirer = require("inquirer");

// inquirer prompts
const startInquirer = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "toDo",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
      ]
    }
  ])
  .then(answers => {
    const nextPrompt = answers.toDo;
    if (nextPrompt === "View all departments") {
      viewDepartments();
    };

    if (nextPrompt === "View all roles") {
      viewRoles();
    };

    if (nextPrompt === "View all employees") {
      viewEmployees();
    };

    if (nextPrompt === "Add a department") {
      addDepartment();
    };

    if (nextPrompt === "Exit") {
      process.exit();
    };
  })
};

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.table(rows);
    startInquirer();
  });
};

const viewRoles = () => {
  const sql = `SELECT roles.id, 
                      roles.title, 
                      roles.salary, 
                      departments.name AS department
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.table(rows);
    startInquirer();
  });
};

const viewEmployees = () => {
  const sql = `SELECT employees.id, 
                      employees.first_name, 
                      employees.last_name,
                      roles.title AS title,
                      roles.salary AS salary,
                      departments.name AS department,
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager 
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON employees.manager_id = manager.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.table(rows);
    startInquirer();
  });
};

const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of this department?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a department name");
          return false;
        };
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO departments (name)
      VALUES (?)`;
    const params = answer.name;
    db.query(sql, params, (err) => {
      if (err) {
        throw err;
      }
      startInquirer();
    });
  });
};

module.exports = startInquirer;