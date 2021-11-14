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
    if (nextPrompt === "Exit") {
      process.exit();
    }
    if (nextPrompt === "View all departments") {
      viewDepartments();
    }
  })
};

const viewDepartments = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message})
      return;
    }
    console.table(rows);
    startInquirer();
  });
};

module.exports = startInquirer;