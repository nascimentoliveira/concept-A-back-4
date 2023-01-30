"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRepository = void 0;
const config_1 = require("@/config");
function getAll() {
    return config_1.prisma.student.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });
}
function findById(id) {
    return config_1.prisma.student.findUnique({
        where: { id },
    });
}
function findByName(name) {
    return config_1.prisma.student.findUnique({
        where: { name },
    });
}
function listStudentsByClass(id) {
    return config_1.prisma.class.findUnique({
        where: {
            id,
        },
        include: {
            Student: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
}
function create(name, classId) {
    return config_1.prisma.student.create({
        data: { name, classId },
    });
}
function update(id, name, classId) {
    return config_1.prisma.student.update({
        where: { id },
        data: { name, classId },
    });
}
function deleteStudent(id) {
    return config_1.prisma.student.delete({
        where: { id },
    });
}
exports.studentsRepository = {
    getAll,
    findById,
    findByName,
    listStudentsByClass,
    create,
    update,
    deleteStudent
};
