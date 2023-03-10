"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsService = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentsByClass = exports.getStudentById = exports.getAllStudents = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
async function getAllStudents() {
    return repositories_1.studentsRepository.getAll();
}
exports.getAllStudents = getAllStudents;
async function getStudentById(id) {
    await validateStudentIdExistsOrFail(id);
    return repositories_1.studentsRepository.findById(id);
}
exports.getStudentById = getStudentById;
async function getStudentsByClass(classId) {
    await validateClassIdExistsOrFail(classId);
    const class_ = await repositories_1.studentsRepository.listStudentsByClass(classId);
    return {
        id: class_.id,
        className: class_.name,
        students: class_.Student.map((s) => {
            return {
                studentId: s.id,
                studentName: s.name,
            };
        }),
        createdAt: class_.createdAt,
    };
}
exports.getStudentsByClass = getStudentsByClass;
async function createStudent(student) {
    await validateUniqueNameOrFail(student.name);
    await validateClassIdExistsOrFail(student.classId);
    return repositories_1.studentsRepository.create(student.name, student.classId);
}
exports.createStudent = createStudent;
async function updateStudent(student, studentId) {
    await validateStudentIdExistsOrFail(studentId);
    await validateClassIdExistsOrFail(student.classId);
    await validateUniqueNameOrFail(student.name, studentId);
    return repositories_1.studentsRepository.update(studentId, student.name, student.classId);
}
exports.updateStudent = updateStudent;
async function deleteStudent(id) {
    await validateStudentIdExistsOrFail(id);
    const student = await repositories_1.studentsRepository.deleteStudent(id);
    return { id: student.id };
}
exports.deleteStudent = deleteStudent;
async function validateUniqueNameOrFail(name, studentId) {
    const studentWithSameName = await repositories_1.studentsRepository.findByName(name);
    if (studentId) {
        if (studentWithSameName && studentId !== studentWithSameName.id) {
            throw (0, errors_1.duplicatedNameError)("student");
        }
    }
    else {
        if (studentWithSameName) {
            throw (0, errors_1.duplicatedNameError)("student");
        }
    }
}
async function validateStudentIdExistsOrFail(id) {
    const studentExists = await repositories_1.studentsRepository.findById(id);
    if (!studentExists) {
        throw (0, errors_1.notFoundError)("No student was found with this id");
    }
}
async function validateClassIdExistsOrFail(id) {
    const classExists = await repositories_1.classesRepository.findById(id);
    if (!classExists) {
        throw (0, errors_1.notFoundError)("No class was found with this id");
    }
}
exports.studentsService = {
    getAllStudents,
    getStudentById,
    getStudentsByClass,
    createStudent,
    updateStudent,
    deleteStudent,
};
