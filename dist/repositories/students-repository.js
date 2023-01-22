import database from "../database/database.js";
function getAll() {
    return database.query("\n    SELECT *\n    FROM students\n    ORDER BY \"createdAt\"");
}
function findById(id) {
    return database.query("\n    SELECT *\n    FROM students\n    WHERE id=$1", [id]);
}
function findByName(name) {
    return database.query("\n    SELECT *\n    FROM students\n    WHERE name=$1", [name]);
}
function listStudentsByClass(classId) {
    return database.query("\n    SELECT\n      classes.id,\n      classes.name AS \"className\", (\n        SELECT\n          COALESCE(json_agg(json_build_object(\n            'id', students.id,\n            'name', students.name\n          )), '[]') AS \"students\"\n        FROM students\n        WHERE students.\"classId\"=$1\n      )\n    FROM classes\n    WHERE classes.id=$1;", [classId]);
}
function create(name, classId) {
    return database.query("\n    INSERT INTO students(\"name\", \"classId\")\n    VALUES ($1, $2)\n    RETURNING id, name, \"classId\", \"createdAt\";", [name, classId]);
}
function update(id, name, classId) {
    return database.query("\n    UPDATE students\n    SET name=$2, \"classId\"=$3\n    WHERE id=$1\n    RETURNING id, name, \"classId\", \"createdAt\";", [id, name, classId]);
}
function deleteStudent(id) {
    return database.query("\n    DELETE \n    FROM students\n    WHERE id=$1\n    RETURNING id", [id]);
}
export var studentsRepository = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    listStudentsByClass: listStudentsByClass,
    create: create,
    update: update,
    deleteStudent: deleteStudent
};
