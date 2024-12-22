class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Part-Time";
        this.calculatePay();
    }

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52;
    }
}

class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.employeeType = "Manager";
        this.calculatePay();
    }

    calculatePay() {
        this.annualSalary = this.payRate * 40 * 52 - 1000;
    }
}

class Main {
    constructor() {
        this.employees = [
            new PartTime("John Doe", 22, 15, 20),
            new Manager("Jane Smith", 35, 25),
            new PartTime("Alice Brown", 28, 18, 30),
        ];
        this.mainMenu();
    }

    mainMenu() {
        let choice;
        do {
            console.clear();
            console.log("Employee Tracker");
            console.log("1. Display Employees");
            console.log("2. Add Employee");
            console.log("3. Remove Employee");
            console.log("4. Edit Employee Pay");
            console.log("5. Exit");
            choice = prompt("Enter your choice: ");
            switch (choice) {
                case "1":
                    this.displayEmployees();
                    break;
                case "2":
                    this.addEmployee();
                    break;
                case "3":
                    this.removeEmployee();
                    break;
                case "4":
                    this.editEmployeePay();
                    break;
                case "5":
                    console.log("Goodbye!");
                    break;
                default:
                    console.log("Invalid option. Please try again.");
            }
        } while (choice !== "5");
    }

    displayEmployees() {
        console.clear();
        console.log("ID\tName\t\tAge\tSalary\tHours\tPayRate\tType");
        this.employees.forEach((emp, index) => {
            console.log(
                `${index + 1}\t${emp.name}\t${emp.age}\t${emp.annualSalary}\t${emp.hours || "N/A"}\t${emp.payRate}\t${emp.employeeType}`
            );
        });
        prompt("Press Enter to return to the menu...");
    }

    addEmployee() {
        console.clear();
        const name = prompt("Enter employee name: ");
        const age = parseInt(prompt("Enter employee age: "));
        const payRate = parseFloat(prompt("Enter pay rate: "));
        const hours = parseFloat(prompt("Enter hours per week: "));
        let newEmployee;
        if (hours < 40) {
            newEmployee = new PartTime(name, age, payRate, hours);
        } else {
            newEmployee = new Manager(name, age, payRate);
        }
        this.employees.push(newEmployee);
        this.displayEmployees();
    }

    removeEmployee() {
        console.clear();
        const identifier = prompt("Enter employee number or name to remove: ");
        const initialLength = this.employees.length;
        if (isNaN(identifier)) {
            this.employees = this.employees.filter(emp => emp.name.toLowerCase() !== identifier.toLowerCase());
        } else {
            const index = parseInt(identifier) - 1;
            if (index >= 0 && index < this.employees.length) {
                this.employees.splice(index, 1);
            }
        }
        this.displayEmployees();
    }

    editEmployeePay() {
        console.clear();
        const empNumber = parseInt(prompt("Enter employee number to edit: ")) - 1;
        if (empNumber >= 0 && empNumber < this.employees.length) {
            const newPayRate = parseFloat(prompt("Enter new pay rate: "));
            const employee = this.employees[empNumber];
            employee.payRate = newPayRate;
            employee.calculatePay();
        }
        this.displayEmployees();
    }
}

(() => {
    new Main();
})();