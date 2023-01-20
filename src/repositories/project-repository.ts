import { QueryResult } from "pg";

import database from "../database/database.js";

function create(name: string): Promise<QueryResult> {
  return database.query(`
    INSERT INTO projects("name")
    VALUES ($1)
    RETURNING "id", "name", "createdAt";`,
    [name]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM projects
    WHERE name=$1`,
    [name]
  );
}

const projectRepository = {
  create,
  findByName,
};


export default projectRepository;