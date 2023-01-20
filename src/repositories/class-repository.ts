import { QueryResult } from "pg";

import database from "../database/database.js";

function create(name: string): Promise<QueryResult> {
  return database.query(`
    INSERT INTO classes("name")
    VALUES ($1)
    RETURNING "id", "name", "createdAt";`,
    [name]
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

const classRepository = {
  create,
  findByName,
};


export default classRepository;