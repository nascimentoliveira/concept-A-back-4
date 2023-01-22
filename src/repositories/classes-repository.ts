import { QueryResult } from "pg";

import database from "../database/database.js";

function getAll(): Promise<QueryResult> {
  return database.query(`
    SELECT
      classes.id,
      classes.name, (
        SELECT COUNT("projectsClasses"."projectId")
        FROM "projectsClasses"
        WHERE "projectsClasses"."classId"=classes.id
      ) AS "numberOfProjects", (
      SELECT COUNT(students.id)
        FROM students
        WHERE students."classId"=classes.id
      ) AS "numberOfStudents",
      classes."createdAt"
    FROM classes
    ORDER BY classes."createdAt";`,
  );
}

function findById(id: number): Promise<QueryResult> {
  return database.query(`
    SELECT
      classes.id,
      classes.name, (
        SELECT COUNT("projectsClasses"."projectId")
        FROM "projectsClasses"
        WHERE "projectsClasses"."classId"=classes.id
      ) AS "numberOfProjects", (
      SELECT COUNT(students.id)
        FROM students
        WHERE students."classId"=classes.id
      ) AS "numberOfStudents",
      classes."createdAt"
    FROM classes
    WHERE classes.id=$1;`,
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

function listProjectsByClass(classId: number): Promise<QueryResult> {
  return database.query(`
    SELECT
      classes.id,
      classes.name AS "className", (
        SELECT
          COALESCE(json_agg(json_build_object(
            'id', "projectsClasses"."projectId",
            'name', projects.name
          )), '[]') AS "projects"
        FROM "projectsClasses"
        JOIN projects
        ON "projectsClasses"."projectId"=projects.id
        WHERE "projectsClasses"."classId"=$1
      )
    FROM classes
    WHERE classes.id=$1;`,
    [classId]
  );
}

function create(name: string): Promise<QueryResult> {
  return database.query(`
    INSERT INTO classes("name")
    VALUES ($1)
    RETURNING id, name, "createdAt";`,
    [name]
  );
}

function applyProject(classId: number, projectId: number): Promise<QueryResult> {
  return database.query(`
    INSERT INTO "projectsClasses"("projectId", "classId")
    VALUES ($1, $2)
    RETURNING id, "projectId", "classId", "createdAt";`,
    [projectId, classId]
  );
}

function update(id: number, name: string): Promise<QueryResult> {
  return database.query(`
    UPDATE classes
    SET name=$2
    WHERE id=$1
    RETURNING id, name, "createdAt";`,
    [id, name]
  );
}

function deleteClass(id: number): Promise<QueryResult> {
  return database.query(`
    DELETE 
    FROM classes
    WHERE id=$1
    RETURNING id`,
    [id]
  );
}

function removeProject(classId: number, projectId: number): Promise<QueryResult> {
  return database.query(`
    DELETE 
    FROM "projectsClasses"
    WHERE "projectId"=$1 AND "classId"=$2
    RETURNING id`,
    [projectId, classId]
  );
}

export const classesRepository = {
  getAll,
  findById,
  findByName,
  listProjectsByClass,
  create,
  applyProject,
  update,
  deleteClass,
  removeProject
};