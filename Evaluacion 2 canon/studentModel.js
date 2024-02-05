// studentModel.js
class StudentModel {
    constructor() {
        if (StudentModel.instance) {
            return StudentModel.instance;
        }
        StudentModel.instance = this;
        this.students = [];
    }

    addStudent(student) {
        // Asegúrate de que el estudiante tenga un ID único
        if (!student.id) {
            throw new Error('El estudiante debe tener un ID único');
        }
        this.students.push(student);
    }

    getStudents() {
        return this.students;
    }

    getStudent(id) {
        return this.students.find(student => student.id === id);
    }

    updateStudent(id, updatedInfo) {
        let studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            throw new Error('Estudiante no encontrado');
        }
        this.students[studentIndex] = {...this.students[studentIndex], ...updatedInfo};
    }

    deleteStudent(id) {
        let studentIndex = this.students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            throw new Error('Estudiante no encontrado');
        }
        this.students.splice(studentIndex, 1);
    }
}

module.exports = new StudentModel();
