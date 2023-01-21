import { QueryResult } from "pg";

import database from "../database/database.js";

function getAll(): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM "classes"`,
  );
}

function findById(id: number): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM "classes"
    WHERE "id"=$1`,
    [id]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM classes
    WHERE name=$1`,
    [name]
  );
}

function create(name: string): Promise<QueryResult> {
  return database.query(`
    INSERT INTO classes("name")
    VALUES ($1)
    RETURNING "id", "name", "createdAt";`,
    [name]
  );
}

function update(id: number, name: string): Promise<QueryResult> {
  return database.query(`
    UPDATE "classes"
    SET "name"=$2
    WHERE "id"=$1
    RETURNING "id", "name", "createdAt";`,
    [id, name]
  );
}

function deleteClass(id: number): Promise<QueryResult> {
  return database.query(`
    DELETE 
    FROM "classes"
    WHERE "id"=$1
    RETURNING "id"`,
    [id]
  );
}

export const classesRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteClass
};