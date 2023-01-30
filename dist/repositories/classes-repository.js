"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRepository = void 0;
const database_1 = require("@/database");
function getAll() {
    return database_1.db.query(`
    SELECT
      classes.id,
      classes.name, (
        SELECT COUNT("projectsClasses"."projectId")
        FROM "projectsClasses"
        WHERE "projectsClasses"."classId"=classes.id
      ) AS "numberOfProjects", (
      SELECT COUNT(students.id)
        FROM students
        WHERE students."classId"=classes.id
      ) AS "numberOfStudents",
      classes."createdAt"
    FROM classes
    ORDER BY classes."createdAt";`);
}
function findById(id) {
    return database_1.db.query(`
    SELECT
      classes.id,
      classes.name, (
        SELECT COUNT("projectsClasses"."projectId")
        FROM "projectsClasses"
        WHERE "projectsClasses"."classId"=classes.id
      ) AS "numberOfProjects", (
      SELECT COUNT(students.id)
        FROM students
        WHERE students."classId"=classes.id
      ) AS "numberOfStudents",
      classes."createdAt"
    FROM classes
    WHERE classes.id=$1;`, [id]);
}
function findByName(name) {
    return database_1.db.query(`
    SELECT *
    FROM classes
    WHERE name=$1`, [name]);
}
function findProjectApplied(classId, projectId) {
    return database_1.db.query(`
    SELECT *
    FROM "projectsClasses"
    WHERE "classId"=$1 AND "projectId"=$2`, [classId, projectId]);
}
function listProjectsByClass(classId) {
    return database_1.db.query(`
    SELECT
      classes.id,
      classes.name AS "className", (
        SELECT
          COALESCE(json_agg(json_build_object(
            'id', "projectsClasses"."projectId",
            'name', projects.name
          )), '[]') AS "projects"
        FROM "projectsClasses"
        JOIN projects
        ON "projectsClasses"."projectId"=projects.id
        WHERE "projectsClasses"."classId"=$1
      )
    FROM classes
    WHERE classes.id=$1;`, [classId]);
}
function create(name) {
    return database_1.db.query(`
    INSERT INTO classes("name")
    VALUES ($1)
    RETURNING id, name, "createdAt";`, [name]);
}
function applyProject(classId, projectId) {
    return database_1.db.query(`
    INSERT INTO "projectsClasses"("projectId", "classId")
    VALUES ($1, $2)
    RETURNING id, "projectId", "classId", "createdAt";`, [projectId, classId]);
}
function update(id, name) {
    return database_1.db.query(`
    UPDATE classes
    SET name=$2
    WHERE id=$1
    RETURNING id, name, "createdAt";`, [id, name]);
}
function deleteClass(id) {
    return database_1.db.query(`
    DELETE 
    FROM classes
    WHERE id=$1
    RETURNING id`, [id]);
}
function removeProject(classId, projectId) {
    return database_1.db.query(`
    DELETE 
    FROM "projectsClasses"
    WHERE "projectId"=$1 AND "classId"=$2
    RETURNING id`, [projectId, classId]);
}
exports.classesRepository = {
    getAll,
    findById,
    findByName,
    findProjectApplied,
    listProjectsByClass,
    create,
    applyProject,
    update,
    deleteClass,
    removeProject
};
