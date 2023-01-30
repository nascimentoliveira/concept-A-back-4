"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRepository = void 0;
const database_1 = require("@/database");
function getAll() {
    return database_1.db.query(`
    SELECT *
    FROM students
    ORDER BY "createdAt"`);
}
function findById(id) {
    return database_1.db.query(`
    SELECT *
    FROM students
    WHERE id=$1`, [id]);
}
function findByName(name) {
    return database_1.db.query(`
    SELECT *
    FROM students
    WHERE name=$1`, [name]);
}
function listStudentsByClass(classId) {
    return database_1.db.query(`
    SELECT
      classes.id,
      classes.name AS "className", (
        SELECT
          COALESCE(json_agg(json_build_object(
            'id', students.id,
            'name', students.name
          )), '[]') AS "students"
        FROM students
        WHERE students."classId"=$1
      )
    FROM classes
    WHERE classes.id=$1;`, [classId]);
}
function create(name, classId) {
    return database_1.db.query(`
    INSERT INTO students("name", "classId")
    VALUES ($1, $2)
    RETURNING id, name, "classId", "createdAt";`, [name, classId]);
}
function update(id, name, classId) {
    return database_1.db.query(`
    UPDATE students
    SET name=$2, "classId"=$3
    WHERE id=$1
    RETURNING id, name, "classId", "createdAt";`, [id, name, classId]);
}
function deleteStudent(id) {
    return database_1.db.query(`
    DELETE 
    FROM students
    WHERE id=$1
    RETURNING id`, [id]);
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
