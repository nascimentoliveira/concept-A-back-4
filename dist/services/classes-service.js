"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesService = exports.removeProject = exports.deleteClass = exports.updateClass = exports.applyProject = exports.createClass = exports.listStudentsByClass = exports.listProjectsByClass = exports.getClass = exports.getAllClasses = void 0;
const errors_1 = require("@/errors");
const repositories_1 = require("@/repositories");
async function getAllClasses() {
    const classes = await repositories_1.classesRepository.getAll();
    return classes.map((c) => {
        return {
            id: c.id,
            name: c.name,
            numberOfProjects: c._count.ProjectClass,
            numberOfStudents: c._count.Student,
            createdAt: c.createdAt,
        };
    });
}
exports.getAllClasses = getAllClasses;
async function getClass(id) {
    await validateIdClassExistsOrFail(id);
    const class_ = await repositories_1.classesRepository.findById(id);
    return {
        id: class_.id,
        name: class_.name,
        numberOfProjects: class_._count.ProjectClass,
        numberOfStudents: class_._count.Student,
        createdAt: class_.createdAt,
    };
}
exports.getClass = getClass;
async function listProjectsByClass(id) {
    await validateIdClassExistsOrFail(id);
    const class_ = await repositories_1.classesRepository.listProjectsByClass(id);
    return {
        id: class_.id,
        className: class_.name,
        projects: class_.ProjectClass.map((p) => {
            return {
                projectId: p.Project.id,
                projectName: p.Project.name,
                deadline: p.deadline,
            };
        }),
        createdAt: class_.createdAt,
    };
}
exports.listProjectsByClass = listProjectsByClass;
async function listStudentsByClass(classId) {
    await validateIdClassExistsOrFail(classId);
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
exports.listStudentsByClass = listStudentsByClass;
async function createClass(classParam) {
    await validateUniqueNameOrFail(classParam.name);
    return repositories_1.classesRepository.create(classParam.name);
}
exports.createClass = createClass;
async function applyProject(classId, projectId, deadline) {
    await validateIdClassExistsOrFail(classId);
    await validateIdProjectExistsOrFail(projectId);
    await checkProjectHasApplied(classId, projectId, true);
    return repositories_1.classesRepository.applyProject(classId, projectId, deadline);
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
    const class_ = await repositories_1.classesRepository.deleteClass(id);
    return { id: class_.id };
}
exports.deleteClass = deleteClass;
async function removeProject(classId, projectId) {
    await validateIdClassExistsOrFail(classId);
    await validateIdProjectExistsOrFail(projectId);
    const projectClass = await checkProjectHasApplied(classId, projectId, false);
    await repositories_1.classesRepository.removeProject(projectClass.id);
    return { id: projectClass.id };
}
exports.removeProject = removeProject;
async function validateUniqueNameOrFail(name) {
    const classWithSameName = await repositories_1.classesRepository.findByName(name);
    if (classWithSameName) {
        throw (0, errors_1.duplicatedNameError)("class");
    }
}
async function validateIdClassExistsOrFail(classId) {
    const classExists = await repositories_1.classesRepository.findById(classId);
    if (!classExists) {
        throw (0, errors_1.notFoundError)("No class was found with this id");
    }
}
async function validateIdProjectExistsOrFail(projectId) {
    const projectExists = await repositories_1.projectsRepository.findById(projectId);
    if (!projectExists) {
        throw (0, errors_1.notFoundError)("No project was found with this id");
    }
}
async function checkProjectHasApplied(classId, projectId, insert) {
    const projectHasBeenApplied = await repositories_1.classesRepository.findProjectApplied(classId, projectId);
    if (insert) {
        if (projectHasBeenApplied) {
            throw (0, errors_1.conflictError)("This project has already been applied to this class");
        }
    }
    else {
        if (!projectHasBeenApplied) {
            throw (0, errors_1.notFoundError)("This project was not applied to this class");
        }
    }
    return projectHasBeenApplied;
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
