// studentView.js
const readline = require('readline');
const StudentController = require('./studentController');

class StudentView {
    constructor() {
        this.studentController = StudentController;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    displayStudents() {
        const students = this.studentController.getStudents();
        let html = '<table>';
        html += '<tr><th>ID</th><th>Nombre</th><th>Notas</th></tr>';
        students.forEach(student => {
            html += `<tr><td>${student.id}</td><td>${student.name}</td><td>${JSON.stringify(student.grades)}</td></tr>`;
        });
        html += '</table>';
        return html;
    }

    addGrade(id) {
        this.rl.question('Ingrese la nueva nota: ', (grade) => {
            let student = this.studentController.getStudent(id);
            if (student) {
                student.grades.push(grade);
                this.studentController.updateStudent(id, student);
            }
            this.rl.close();
        });
    }

    displayStats() {
        const students = this.studentController.getStudents();
        students.forEach(student => {
            let sum = student.grades.reduce((a, b) => a + b, 0);
            let avg = sum / student.grades.length;
            console.log(`ID: ${student.id}, Promedio: ${avg}`);
        });
    }
}

module.exports = new StudentView();
