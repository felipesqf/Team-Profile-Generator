// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Engineer = require("./Employee");


class Engineer extends Employee{
    constructor(github, id, name, email){
        this.github = github;    
    
        super(id, name, email); 
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getGithub(){
        console.log(this.github);
    }
    getRole(){
        console.log("Engineer");
    }
}
module.exports = Engineer

// In addition to `Employee`'s properties and methods, `Engineer` will also have:

// - github // GitHub username

// - getGithub()

// - getRole() // Overridden to return 'Engineer'