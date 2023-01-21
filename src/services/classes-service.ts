import { QueryResult } from "pg";

import { Class } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { classesRepository } from "../repositories/classes-repository.js";
import { notFoundError } from "../errors/not-found-error.js";


export async function getAllClasses(): Promise<QueryResult> {
  return classesRepository.getAll();
}

export async function getClass(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return classesRepository.findById(id);
}

export async function createClass(classParam: ClassParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(classParam.name);

  return classesRepository.create(classParam.name);
}

export async function updateClass(class_: ClassParams, classId: number): Promise<QueryResult> {

  await validateIdExistsOrFail(classId);

  await validateUniqueNameOrFail(class_.name);

  return classesRepository.update(classId, class_.name);
}

export async function deleteClass(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return classesRepository.deleteClass(id);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const classWithSameName = await classesRepository.findByName(name);
  if (classWithSameName.rowCount) {
    throw duplicatedNameError("class");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const classExists = await classesRepository.findById(id);
  if (!classExists.rowCount) {
    throw notFoundError("class", "id");
  }
}

export type ClassParams = Pick<Class, "name">;

export const classesService = {
  getAllClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass
};