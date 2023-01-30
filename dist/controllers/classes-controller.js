"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("../services");
async function getAllClasses(req, res) {
    try {
        const classes = await services_1.classesService.getAllClasses();
        return res.status(http_status_1.default.OK).send(classes);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function getClass(req, res) {
    const classId = req.params.classId;
    try {
        const class_ = await services_1.classesService.getClass(Number(classId));
        return res.status(http_status_1.default.OK).send(class_);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function listProjectsByClass(req, res) {
    const classId = req.params.classId;
    try {
        const projects = await services_1.classesService.listProjectsByClass(Number(classId));
        return res.status(http_status_1.default.OK).send(projects);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function listStudentsByClass(req, res) {
    const classId = req.params.classId;
    try {
        const students = await services_1.classesService.listStudentsByClass(Number(classId));
        return res.status(http_status_1.default.OK).send(students);
    }
    catch (error) {
        console.log(error);
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function createClass(req, res) {
    const classParams = req.body;
    try {
        const class_ = await services_1.classesService.createClass(classParams);
        return res.status(http_status_1.default.CREATED).send(class_);
    }
    catch (error) {
        if (error.name === "DuplicatedNameError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function applyProject(req, res) {
    const classId = req.params.classId;
    const projectId = req.params.projectId;
    const { deadline } = req.body;
    try {
        const projectsClasses = await services_1.classesService.applyProject(Number(classId), Number(projectId), deadline);
        return res.status(http_status_1.default.CREATED).send(projectsClasses);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        if (error.name === "ConflictError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function updateClass(req, res) {
    const classParams = req.body;
    const classId = req.params.classId;
    try {
        const class_ = await services_1.classesService.updateClass(classParams, Number(classId));
        return res.status(http_status_1.default.OK).send(class_);
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
async function deleteClass(req, res) {
    const classId = req.params.classId;
    try {
        const class_ = await services_1.classesService.deleteClass(Number(classId));
        return res.status(http_status_1.default.OK).send(class_);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function removeProject(req, res) {
    const classId = req.params.classId;
    const projectId = req.params.projectId;
    try {
        const projectsClasses = await services_1.classesService.removeProject(Number(classId), Number(projectId));
        return res.status(http_status_1.default.OK).send(projectsClasses);
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
exports.classController = {
    getAllClasses,
    getClass,
    listProjectsByClass,
    listStudentsByClass,
    createClass,
    applyProject,
    updateClass,
    deleteClass,
    removeProject,
};
