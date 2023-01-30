"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesService = exports.removeProject = exports.deleteClass = exports.updateClass = exports.applyProject = exports.createClass = exports.listStudentsByClass = exports.listProjectsByClass = exports.getClass = exports.getAllClasses = void 0;
const errors_1 = require("@/errors");
const repositories_1 = require("@/repositories");
async function getAllClasses() {
    return repositories_1.classesRepository.getAll();
}
exports.getAllClasses = getAllClasses;
async function getClass(id) {
    await validateIdClassExistsOrFail(id);
    return repositories_1.classesRepository.findById(id);
}
exports.getClass = getClass;
async function listProjectsByClass(id) {
    await validateIdClassExistsOrFail(id);
    return repositories_1.classesRepository.listProjectsByClass(id);
}
exports.listProjectsByClass = listProjectsByClass;
async function listStudentsByClass(classId) {
    await validateIdClassExistsOrFail(classId);
    return repositories_1.studentsRepository.listStudentsByClass(classId);
}
exports.listStudentsByClass = listStudentsByClass;
async function createClass(classParam) {
    await validateUniqueNameOrFail(classParam.name);
    return repositories_1.classesRepository.create(classParam.name);
}
exports.createClass = createClass;
async function applyProject(classId, projectId) {
    await validateIdClassExistsOrFail(classId);
    await validateIdProjectExistsOrFail(projectId);
    await checkProjectHasApplied(classId, projectId, true);
    return repositories_1.classesRepository.applyProject(classId, projectId);
}
exports.applyProject = applyProject;
async function updateClass(class_, classId) {
    await validateIdClassExistsOrFail(classId);
    await validateUniqueNameOrFail(class_.name);
    return repositories_1.classesRepository.update(classId, class_.name);
}
exports.updateClass = updateClass;
async function deleteClass(id) {
    await validateIdClassExistsOrFail(id);
    return repositories_1.classesRepository.deleteClass(id);
}
exports.deleteClass = deleteClass;
async function removeProject(classId, projectId) {
    await validateIdClassExistsOrFail(classId);
    await validateIdProjectExistsOrFail(projectId);
    await checkProjectHasApplied(classId, projectId, false);
    return repositories_1.classesRepository.removeProject(classId, projectId);
}
exports.removeProject = removeProject;
async function validateUniqueNameOrFail(name) {
    const classWithSameName = await repositories_1.classesRepository.findByName(name);
    if (classWithSameName.rowCount) {
        throw (0, errors_1.duplicatedNameError)("class");
    }
}
async function validateIdClassExistsOrFail(classId) {
    const classExists = await repositories_1.classesRepository.findById(classId);
    if (!classExists.rowCount) {
        throw (0, errors_1.notFoundError)("No class was found with this id");
    }
}
async function validateIdProjectExistsOrFail(projectId) {
    const projectExists = await repositories_1.projectsRepository.findById(projectId);
    if (!projectExists.rowCount) {
        throw (0, errors_1.notFoundError)("No project was found with this id");
    }
}
async function checkProjectHasApplied(classId, projectId, insert) {
    const projectHasBeenApplied = await repositories_1.classesRepository.findProjectApplied(classId, projectId);
    if (insert) {
        if (projectHasBeenApplied.rowCount) {
            throw (0, errors_1.conflictError)("This project has already been applied to this class");
        }
    }
    else {
        if (!projectHasBeenApplied.rowCount) {
            throw (0, errors_1.notFoundError)("This project was not applied to this class");
        }
    }
}
exports.classesService = {
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
