import { QueryResult } from "pg";

import database from "../database/database.js";

function getAll(): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM students`,
  );
}

function findById(id: number): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM students
    WHERE id=$1`,
    [id]
  );
}

function findByClass(classId: number): Promise<QueryResult> {
  return database.query(`
    SELECT
      classes.id,
      classes.name AS "className", (
        SELECT
          json_agg(json_build_object(
            "id", students.id,
            "name", students.name
          )) AS students
        FROM students
        JOIN classes
        ON classes.id=students."classId"
        WHERE students."classId"=$1
      )
    FROM classes
    WHERE classes.id=$1;`,
    [classId]
  );
}

function findByName(name: string): Promise<QueryResult> {
  return database.query(`
    SELECT *
    FROM students
    WHERE name=$1`,
    [name]
  );
}

function listStudentsByClass(classId: number): Promise<QueryResult> {
  return database.query(`
    SELECT
      classes.id,
      classes.name AS "className", (
        SELECT
          json_agg(json_build_object(
            "id", students.id,
            "name", students.name
          )) AS "students"
        FROM students
        WHERE students."classId"=$1
      )
    FROM classes
    WHERE classes.id=$1;`,
    [classId]
  );
}

function create(name: string, classId: number): Promise<QueryResult> {
  return database.query(`
    INSERT INTO students("name", "classId")
    VALUES ($1, $2)
    RETURNING id, name, "classId", "createdAt";`,
    [name, classId]
  );
}

function update(id: number, name: string, classId: number): Promise<QueryResult> {
  return database.query(`
    UPDATE students
    SET name=$2, "classId"=$3
    WHERE id=$1
    RETURNING id, name, "classId", "createdAt";`,
    [id, name, classId]
  );
}

function deleteStudent(id: number): Promise<QueryResult> {
  return database.query(`
    DELETE 
    FROM students
    WHERE id=$1
    RETURNING id`,
    [id]
  );
}

export const studentsRepository = {
  getAll,
  findById,
  findByName,
  findByClass,
  listStudentsByClass,
  create,
  update,
  deleteStudent
};