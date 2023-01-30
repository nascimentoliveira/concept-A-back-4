"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRepository = void 0;
const config_1 = require("@/config");
function getAll() {
    return config_1.prisma.class.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    ProjectClass: true,
                    Student: true,
                },
            },
            createdAt: true,
        },
    });
}
function findById(id) {
    return config_1.prisma.class.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    ProjectClass: true,
                    Student: true,
                },
            },
            createdAt: true,
        }
    });
}
function findByName(name) {
    return config_1.prisma.class.findUnique({
        where: { name },
    });
}
function listProjectsByClass(id) {
    return config_1.prisma.class.findUnique({
        where: {
            id,
        },
        include: {
            ProjectClass: {
                include: {
                    Project: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
    });
}
function create(name) {
    return config_1.prisma.class.create({
        data: { name },
    });
}
function update(id, name) {
    return config_1.prisma.class.update({
        where: { id },
        data: { name },
    });
}
function deleteClass(id) {
    return config_1.prisma.class.delete({
        where: { id },
    });
}
function applyProject(classId, projectId, deadline) {
    return config_1.prisma.projectClass.create({
        data: { classId, projectId, deadline },
    });
}
function findProjectApplied(classId, projectId) {
    return config_1.prisma.projectClass.findFirst({
        where: { classId, projectId }
    });
}
function removeProject(id) {
    return config_1.prisma.projectClass.delete({
        where: { id },
    });
}
exports.classesRepository = {
    getAll,
    findById,
    findByName,
    create,
    update,
    deleteClass,
    listProjectsByClass,
    findProjectApplied,
    applyProject,
    removeProject,
};
