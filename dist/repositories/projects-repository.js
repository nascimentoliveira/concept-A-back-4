import database from "../database/database.js";
function getAll() {
    return database.query("\n    SELECT *\n    FROM projects\n    ORDER BY \"createdAt\"");
}
function findById(id) {
    return database.query("\n    SELECT *\n    FROM projects\n    WHERE id=$1", [id]);
}
function findByName(name) {
    return database.query("\n    SELECT *\n    FROM projects\n    WHERE name=$1", [name]);
}
function create(name) {
    return database.query("\n    INSERT INTO projects(\"name\")\n    VALUES ($1)\n    RETURNING id, name, \"createdAt\";", [name]);
}
function update(id, name) {
    return database.query("\n    UPDATE projects\n    SET name=$2\n    WHERE id=$1\n    RETURNING id, name, \"createdAt\";", [id, name]);
}
function deleteProject(id) {
    return database.query("\n    DELETE \n    FROM projects\n    WHERE id=$1\n    RETURNING id", [id]);
}
export var projectsRepository = {
    getAll: getAll,
    findById: findById,
    findByName: findByName,
    create: create,
    update: update,
    deleteProject: deleteProject
};
