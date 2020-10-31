// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Manager extends Employee{
    constructor(officeNumber, id, name, email){

        this.offuceNumber  = officeNumber;

        super(id, name, email); 
        this.id = id;
        this.name = name;
        this.email = email;
    }
    getRole(){
        console.log("Manager");
    }
}

module.exports = Manager;

// In addition to `Employee`'s properties and methods, `Manager` will also have:

// - officeNumber

// - getRole() // Overridden to return 'Manager'