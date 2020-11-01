const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let roleChoices = ["Engineer", "Intern", "Manager"]
const inputEmployees = []
const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

//propmt user question
init = () =>{
    inquirer.prompt([{
        type: "list",
        name: "role",
        message: "What is the employee role?",
        choices: roleChoices
        },
      {
        type: "input",
        name: "name",
        message: "What is the employee name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee id"
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee email?"
      }
    ])
    .then((newEmployee) => {
        if (newEmployee.role == "Intern"){ //if intern ask scholll
            inquirer.prompt(
                {
                  type: "input",
                  name: "school",
                  message: "Please enter your school"
                }
            )
            .then((response) => {
                const newIntern = new Intern(newEmployee.name, newEmployee.id, newEmployee.email, response.school);
                manageNewEmployees(newIntern)
            })
        }
        else if (newEmployee.role == "Engineer"){ //if engineer ask for github
            inquirer.prompt(
                {
                  type: "input",
                  name: "github",
                  message: "Please enter your Github username"
                }
            )
            .then((response) => {
            const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, response.github);
            manageNewEmployees(newEngineer)
        })
        }
        else{ //if manager get office number
            inquirer.prompt(
                {
                  type: "input",
                  name: "office",
                  message: "Please enter your Office Number"
                }
            )
            .then((response) => {
            const newManger = new Manager(newEmployee.name, newEmployee.id, newEmployee.email,  response.office);
            roleChoices = ["Engineer", "Intern"]; //delete manager from the array
            manageNewEmployees(newManger)
        })
        }
    })
  }
manageNewEmployees = (emp) =>{
    inputEmployees.push(emp) //push user input into the array
    askEnterEmployee()
}

askEnterEmployee = () =>{//initial prompt
    inquirer
        .prompt([
        {
            type: "confirm",
            name: "choice",
            message: "Do you want to enter a new employee?"
        }
        ])
        .then(val => {
        if (val.choice) {
            init();
        } else { //write html into team.html
            const html = render(inputEmployees);
            fs.writeFile(outputPath, html, function(err) {
                if (err) {
                  return console.log(err);
                }
              });
        }
        })
}
askEnterEmployee()
