// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Intern = require("./Employee");


class Intern extends Employee{
    constructor(school, id, name, email){
        this.school = scholl;
        
        super(id, name, email); 
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getSchool(){
        console.log(this.school);
    }
    getRole(){
        console.log("Intern");
    }
}

module.exports = Intern;

// In addition to `Employee`'s properties and methods, `Intern` will also have:

// - school

// - getSchool()

// - getRole() // Overridden to return 'Intern'