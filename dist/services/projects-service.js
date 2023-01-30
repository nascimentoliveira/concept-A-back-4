"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsService = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getAllProjects = void 0;
const errors_1 = require("../errors");
const repositories_1 = require("../repositories");
async function getAllProjects() {
    return repositories_1.projectsRepository.getAll();
}
exports.getAllProjects = getAllProjects;
async function getProject(id) {
    await validateIdExistsOrFail(id);
    return repositories_1.projectsRepository.findById(id);
}
exports.getProject = getProject;
async function createProject(project) {
    await validateUniqueNameOrFail(project.name);
    return repositories_1.projectsRepository.create(project.name);
}
exports.createProject = createProject;
async function updateProject(project, projectId) {
    await validateIdExistsOrFail(projectId);
    await validateUniqueNameOrFail(project.name);
    return repositories_1.projectsRepository.update(projectId, project.name);
}
exports.updateProject = updateProject;
async function deleteProject(id) {
    await validateIdExistsOrFail(id);
    const project = await repositories_1.projectsRepository.deleteProject(id);
    return { id: project.id };
}
exports.deleteProject = deleteProject;
async function validateUniqueNameOrFail(name) {
    const projectWithSameName = await repositories_1.projectsRepository.findByName(name);
    if (projectWithSameName) {
        throw (0, errors_1.duplicatedNameError)("project");
    }
}
async function validateIdExistsOrFail(id) {
    const projectExists = await repositories_1.projectsRepository.findById(id);
    if (!projectExists) {
        throw (0, errors_1.notFoundError)("No project was found with this id");
    }
}
exports.projectsService = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
};
