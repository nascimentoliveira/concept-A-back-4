import { QueryResult } from "pg";

import { db } from "@/database";

function getAll(): Promise<QueryResult> {
  return db.query(`
    SELECT *
    FROM projects
    ORDER BY "createdAt"`,
  );
}

function findById(id: number): Promise<QueryResult> {
  return db.query(`
    SELECT *
    FROM projects
    WHERE id=$1`,
    [id]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return db.query(`
    SELECT *
    FROM projects
    WHERE name=$1`,
    [name]
  );
}

function create(name: string): Promise<QueryResult> {
  return db.query(`
    INSERT INTO projects("name")
    VALUES ($1)
    RETURNING id, name, "createdAt";`,
    [name]
  );
}

function update(id: number, name: string): Promise<QueryResult> {
  return db.query(`
    UPDATE projects
    SET name=$2
    WHERE id=$1
    RETURNING id, name, "createdAt";`,
    [id, name]
  );
}

function deleteProject(id: number): Promise<QueryResult> {
  return db.query(`
    DELETE 
    FROM projects
    WHERE id=$1
    RETURNING id`,
    [id]
  );
}

export const projectsRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteProject
};