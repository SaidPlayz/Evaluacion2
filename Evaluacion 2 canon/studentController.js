// studentController.js
const StudentModel = require('./studentModel');

class StudentController {
    constructor() {
        this.studentModel = StudentModel;
    }

    addStudent(student) {
        try {
            this.studentModel.addStudent(student);
        } catch (error) {
            console.error(error);
        }
    }

    getStudents() {
        return this.studentModel.getStudents();
    }

    getStudent(id) {
        return this.studentModel.getStudent(id);
    }

    updateStudent(id, updatedInfo) {
        try {
            this.studentModel.updateStudent(id, updatedInfo);
        } catch (error) {
            console.error(error);
        }
    }

    deleteStudent(id) {
        try {
            this.studentModel.deleteStudent(id);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new StudentController();
