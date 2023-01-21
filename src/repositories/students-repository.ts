import { QueryResult } from "pg";

import database from "../database/database.js";

function getAll(): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM "students"`,
  );
}

function findById(id: number): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM "students"
    WHERE "id"=$1`,
    [id]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM "students"
    WHERE "name"=$1`,
    [name]
  );
}

function create(name: string, classId: number): Promise<QueryResult> {
  return database.query(`
    INSERT INTO "students"("name", "classId")
    VALUES ($1, $2)
    RETURNING "id", "name", "classId", "createdAt";`,
    [name, classId]
  );
}

function update(id: number, name: string, classId: number): Promise<QueryResult> {
  return database.query(`
    UPDATE "students"
    SET "name"=$2, "classId"=$3
    WHERE "id"=$1
    RETURNING "id", "name", "classId", "createdAt";`,
    [id, name, classId]
  );
}

function deleteStudent(id: number): Promise<QueryResult> {
  return database.query(`
    DELETE 
    FROM "students"
    WHERE "id"=$1
    RETURNING "id"`,
    [id]
  );
}

export const studentsRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteStudent
};