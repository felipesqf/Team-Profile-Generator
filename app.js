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
        if (newEmployee.role == "Intern"){
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
        else if (newEmployee.role == "Engineer"){
            inquirer.prompt(
                {
                  type: "input",
                  name: "github",
                  message: "Please enter your Github username"
                }
            )
            .then((response) => {
            const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, response.github,newEmployee.role);
            manageNewEmployees(newEngineer)
        })
        }
        else{
            inquirer.prompt(
                {
                  type: "input",
                  name: "office",
                  message: "Please enter your Office Number"
                }
            )
            .then((response) => {
            const newManger = new Manager(newEmployee.name, newEmployee.id, newEmployee.email,  response.office);
            roleChoices = ["Engineer", "Intern"];
            manageNewEmployees(newManger)
        })
        }
    })
  }
manageNewEmployees = (emp) =>{
    inputEmployees.push(emp)
    askEnterEmployee()
}

askEnterEmployee = () =>{
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
        } else {
            const html = render(inputEmployees);
            fs.writeFile(outputPath, html, function(err) {
                if (err) {
                  return console.log(err);
                }
                console.log("Success!");
              });
        }
        })
}
// checkManagerExistent = () =>{
//     console.log(inputEmployees)
//     for (let i = 0; i < inputEmployees.length; i++){
//     if (inputEmployees[i] == "Manager") 
//         return roleChoices = ["Engineer", "Intern", "Manager"]
//     else{
//         return roleChoices =  ["Engineer", "Intern"] 
//     }
// }
// }
askEnterEmployee()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html`  in the
// `output` folder.You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```