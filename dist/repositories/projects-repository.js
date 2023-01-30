"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRepository = void 0;
const database_1 = require("@/database");
function getAll() {
    return database_1.db.query(`
    SELECT *
    FROM projects
    ORDER BY "createdAt"`);
}
function findById(id) {
    return database_1.db.query(`
    SELECT *
    FROM projects
    WHERE id=$1`, [id]);
}
function findByName(name) {
    return database_1.db.query(`
    SELECT *
    FROM projects
    WHERE name=$1`, [name]);
}
function create(name) {
    return database_1.db.query(`
    INSERT INTO projects("name")
    VALUES ($1)
    RETURNING id, name, "createdAt";`, [name]);
}
function update(id, name) {
    return database_1.db.query(`
    UPDATE projects
    SET name=$2
    WHERE id=$1
    RETURNING id, name, "createdAt";`, [id, name]);
}
function deleteProject(id) {
    return database_1.db.query(`
    DELETE 
    FROM projects
    WHERE id=$1
    RETURNING id`, [id]);
}
exports.projectsRepository = {
    getAll,
    findById,
    findByName,
    create,
    update,
    deleteProject
};
