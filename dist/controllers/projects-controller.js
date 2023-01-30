"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("@/services");
async function getAllProjects(req, res) {
    try {
        const projects = await services_1.projectsService.getAllProjects();
        return res.status(http_status_1.default.OK).send(projects);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function getProject(req, res) {
    const projectId = req.params.projectId;
    try {
        const project = await services_1.projectsService.getProject(Number(projectId));
        return res.status(http_status_1.default.OK).send(project);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function createProject(req, res) {
    const projectParams = req.body;
    try {
        const project = await services_1.projectsService.createProject(projectParams);
        return res.status(http_status_1.default.CREATED).send(project);
    }
    catch (error) {
        if (error.name === "DuplicatedNameError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function updateProject(req, res) {
    const projectParams = req.body;
    const projectId = req.params.projectId;
    try {
        const project = await services_1.projectsService.updateProject(projectParams, Number(projectId));
        return res.status(http_status_1.default.OK).send(project);
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
async function deleteProject(req, res) {
    const projectId = req.params.projectId;
    try {
        const project = await services_1.projectsService.deleteProject(Number(projectId));
        return res.status(http_status_1.default.OK).send(project);
    }
    catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(http_status_1.default.NOT_FOUND).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.projectsController = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
};
