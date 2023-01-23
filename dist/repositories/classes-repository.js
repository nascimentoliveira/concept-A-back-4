import database from "../database/database.js";
function getAll() {
    return database.query("\n    SELECT\n      classes.id,\n      classes.name, (\n        SELECT COUNT(\"projectsClasses\".\"projectId\")\n        FROM \"projectsClasses\"\n        WHERE \"projectsClasses\".\"classId\"=classes.id\n      ) AS \"numberOfProjects\", (\n      SELECT COUNT(students.id)\n        FROM students\n        WHERE students.\"classId\"=classes.id\n      ) AS \"numberOfStudents\",\n      classes.\"createdAt\"\n    FROM classes\n    ORDER BY classes.\"createdAt\";");
}
function findById(id) {
    return database.query("\n    SELECT\n      classes.id,\n      classes.name, (\n        SELECT COUNT(\"projectsClasses\".\"projectId\")\n        FROM \"projectsClasses\"\n        WHERE \"projectsClasses\".\"classId\"=classes.id\n      ) AS \"numberOfProjects\", (\n      SELECT COUNT(students.id)\n        FROM students\n        WHERE students.\"classId\"=classes.id\n      ) AS \"numberOfStudents\",\n      classes.\"createdAt\"\n    FROM classes\n    WHERE classes.id=$1;", [id]);
}
function findByName(name) {
    return database.query("\n    SELECT *\n    FROM classes\n    WHERE name=$1", [name]);
}
function findProjectApplied(classId, projectId) {
    return database.query("\n    SELECT *\n    FROM \"projectsClasses\"\n    WHERE \"classId\"=$1 AND \"projectId\"=$2", [classId, projectId]);
}
function listProjectsByClass(classId) {
    return database.query("\n    SELECT\n      classes.id,\n      classes.name AS \"className\", (\n        SELECT\n          COALESCE(json_agg(json_build_object(\n            'id', \"projectsClasses\".\"projectId\",\n            'name', projects.name\n          )), '[]') AS \"projects\"\n        FROM \"projectsClasses\"\n        JOIN projects\n        ON \"projectsClasses\".\"projectId\"=projects.id\n        WHERE \"projectsClasses\".\"classId\"=$1\n      )\n    FROM classes\n    WHERE classes.id=$1;", [classId]);
}
function create(name) {
    return database.query("\n    INSERT INTO classes(\"name\")\n    VALUES ($1)\n    RETURNING id, name, \"createdAt\";", [name]);
}
function applyProject(classId, projectId) {
    return database.query("\n    INSERT INTO \"projectsClasses\"(\"projectId\", \"classId\")\n    VALUES ($1, $2)\n    RETURNING id, \"projectId\", \"classId\", \"createdAt\";", [projectId, classId]);
}
function update(id, name) {
    return database.query("\n    UPDATE classes\n    SET name=$2\n    WHERE id=$1\n    RETURNING id, name, \"createdAt\";", [id, name]);
}
function deleteClass(id) {
    return database.query("\n    DELETE \n    FROM classes\n    WHERE id=$1\n    RETURNING id", [id]);
}
function removeProject(classId, projectId) {
    return database.query("\n    DELETE \n    FROM \"projectsClasses\"\n    WHERE \"projectId\"=$1 AND \"classId\"=$2\n    RETURNING id", [projectId, classId]);
}
export var classesRepository = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    findProjectApplied: findProjectApplied,
    listProjectsByClass: listProjectsByClass,
    create: create,
    applyProject: applyProject,
    update: update,
    deleteClass: deleteClass,
    removeProject: removeProject
};
