// app.js
const readline = require('readline');
const StudentController = require('./studentController');
const StudentView = require('./studentView');

class App {
    constructor() {
        this.studentController = StudentController;
        this.studentView = StudentView;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    start() {
        this.showMenu();
    }

    showMenu() {
        console.log(`
        1. Agregar estudiante
        2. Ingresar notas
        3. Mostrar estudiantes
        4. Salir
        `);
        this.rl.question('Seleccione una opción: ', (option) => {
            switch (option) {
                case '1':
                    this.rl.question('Ingrese el ID y el nombre del estudiante (separados por una coma): ', (input) => {
                        let [id, name] = input.split(',');
                        // Verifica si el ID es numérico
                        if (isNaN(id)) {
                            console.log('El ID debe ser numérico');
                            this.showMenu();
                        } else if (this.studentController.getStudent(id)) {
                            console.log('Esta ID ya está ocupada');
                            this.showMenu();
                        } else {
                            this.studentController.addStudent({id, name, grades: []});
                            console.log(`Se guardó exitosamente el estudiante con ID: ${id} y nombre: ${name}`);
                            this.showMenu();
                        }
                    });
                    break;
                case '2':
                    this.rl.question('Ingrese el ID del estudiante: ', (id) => {
                        this.rl.question('Ingrese la nueva nota: ', (grade) => {
                            let student = this.studentController.getStudent(id);
                            if (student) {
                                student.grades.push(grade);
                                this.studentController.updateStudent(id, student);
                                console.log(`Se guardó exitosamente la nota ${grade} para el estudiante con ID: ${id}`);
                            }
                            this.showMenu();
                        });
                    });
                    break;
                case '3':
                    const students = this.studentController.getStudents();
                    if (students.length === 0) {
                        console.log('No se han ingresado estudiantes');
                    } else {
                        students.forEach(student => {
                            console.log(`ID: ${student.id}, Nombre: ${student.name}, Notas: ${JSON.stringify(student.grades)}`);
                        });
                    }
                    this.showMenu();
                    break;
                case '4':
                    this.rl.close();
                    break;
                default:
                    console.log('Opción no válida');
                    this.showMenu();
                    break;
            }
        });
    }
}

const app = new App();
app.start();

/*NOTA: PARA EJECUTAR ESTE CODIGO ES NECESARIO INGRESAR EN NUESTRA TERMINAL
"node app.js" al ingresar esto se estara visualizando un menu interactivo para el 
usuario donde podra agregar un estudiante, ingresar su nota, y mostrar los estudiantes 
que fueron ingresados con anterioridad funcionara si tenemos instalados todos los paquetes
necesarios de node.js en nuestro computador */
