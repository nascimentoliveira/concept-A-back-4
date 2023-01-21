import { QueryResult } from "pg";

import { Class } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { classesRepository } from "../repositories/classes-repository.js";
import { notFoundError } from "../errors/not-found-error.js";
import { projectsRepository } from "../repositories/projects-repository.js";
import { studentsRepository } from "../repositories/students-repository.js";


export async function getAllClasses(): Promise<QueryResult> {
  return classesRepository.getAll();
}

export async function getClass(id: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(id);
  return classesRepository.findById(id);
}

export async function listProjectsByClass(id: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(id);
  return classesRepository.listProjectsByClass(id);
}

export async function listStudentsByClass(classId: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(classId);
  return studentsRepository.listStudentsByClass(classId);
}

export async function createClass(classParam: ClassParams): Promise<QueryResult> {
  await validateUniqueNameOrFail(classParam.name);
  return classesRepository.create(classParam.name);
}

export async function applyProject(classId: number, projectId: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(classId);
  await validateIdProjectExistsOrFail(projectId);
  return classesRepository.applyProject(classId, projectId);
}

export async function updateClass(class_: ClassParams, classId: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(classId);
  await validateUniqueNameOrFail(class_.name);
  return classesRepository.update(classId, class_.name);
}

export async function deleteClass(id: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(id);
  return classesRepository.deleteClass(id);
}

export async function removeProject(classId: number, projectId: number): Promise<QueryResult> {
  await validateIdClassExistsOrFail(classId);
  await validateIdProjectExistsOrFail(projectId);
  return classesRepository.removeProject(classId, projectId);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const classWithSameName = await classesRepository.findByName(name);
  if (classWithSameName.rowCount) {
    throw duplicatedNameError("class");
  }
}

async function validateIdClassExistsOrFail(id: number): Promise<void> {
  const classExists = await classesRepository.findById(id);
  if (!classExists.rowCount) {
    throw notFoundError("class", "id");
  }
}

async function validateIdProjectExistsOrFail(id: number): Promise<void> {
  const projectExists = await projectsRepository.findById(id);
  if (!projectExists.rowCount) {
    throw notFoundError("project", "id");
  }
}

export type ClassParams = Pick<Class, "name">;

export const classesService = {
  getAllClasses,
  getClass,
  listProjectsByClass,
  listStudentsByClass,
  createClass,
  applyProject,
  updateClass,
  deleteClass,
  removeProject
};