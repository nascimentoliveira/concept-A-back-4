"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("@/services");
async function getAllStudents(req, res) {
    try {
        const students = await services_1.studentsService.getAllStudents();
        return res.status(http_status_1.default.OK).send(students.rows);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function getStudentById(req, res) {
    const studentId = req.params.studentId;
    try {
        const student = await services_1.studentsService.getStudentById(Number(studentId));
        return res.status(http_status_1.default.OK).send(student.rows[0]);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function getStudentsByClass(req, res) {
    const classId = req.params.classId;
    try {
        const students = await services_1.studentsService.getStudentsByClass(Number(classId));
        return res.status(http_status_1.default.OK).send(students.rows[0]);
    }
    catch (error) {
        console.log(error);
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function createStudent(req, res) {
    const projectParams = req.body;
    try {
        const student = await services_1.studentsService.createStudent(projectParams);
        return res.status(http_status_1.default.CREATED).send(student.rows[0]);
    }
    catch (error) {
        if (error.name === "DuplicatedNameError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function updateStudent(req, res) {
    const studentParams = req.body;
    const studentId = req.params.studentId;
    try {
        const student = await services_1.studentsService.updateStudent(studentParams, Number(studentId));
        return res.status(http_status_1.default.OK).send(student.rows[0]);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        if (error.name === "DuplicatedNameError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function deleteStudent(req, res) {
    const studentId = req.params.studentId;
    try {
        const student = await services_1.studentsService.deleteStudent(Number(studentId));
        return res.status(http_status_1.default.OK).send(student.rows[0]);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.studentsController = {
    getAllStudents,
    getStudentById,
    getStudentsByClass,
    createStudent,
    updateStudent,
    deleteStudent,
};
