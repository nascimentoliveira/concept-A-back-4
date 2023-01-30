"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRepository = void 0;
const config_1 = require("../config");
function getAll() {
    return config_1.prisma.project.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });
}
function findById(id) {
    return config_1.prisma.project.findUnique({
        where: { id },
    });
}
function findByName(name) {
    return config_1.prisma.project.findUnique({
        where: { name },
    });
}
function create(name) {
    return config_1.prisma.project.create({
        data: { name },
    });
}
function update(id, name) {
    return config_1.prisma.project.update({
        where: { id },
        data: { name },
    });
}
function deleteProject(id) {
    return config_1.prisma.project.delete({
        where: { id },
    });
}
exports.projectsRepository = {
    getAll,
    findById,
    findByName,
    create,
    update,
    deleteProject
};
