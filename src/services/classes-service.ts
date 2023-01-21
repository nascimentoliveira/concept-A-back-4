import { QueryResult } from "pg";

import { Class } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { classRepository } from "../repositories/class-repository.js";
import { notFoundError } from "../errors/not-found-error.js";


export async function getAllClasses(): Promise<QueryResult> {
  return classRepository.getAll();
}

export async function getClass(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return classRepository.findById(id);
}

export async function createClass(classParam: ClassParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(classParam.name);

  return classRepository.create(classParam.name);
}

export async function updateClass(class_: ClassParams, classId: number): Promise<QueryResult> {

  await validateIdExistsOrFail(classId);

  await validateUniqueNameOrFail(class_.name);

  return classRepository.update(classId, class_.name);
}


async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await classRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError('class');
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const classExists = await classRepository.findById(id);
  if (!classExists.rowCount) {
    throw notFoundError("project", "id");
  }
}

export type ClassParams = Pick<Class, "name">;

export const classesService = {
  getAllClasses,
  getClass,
  createClass,
  updateClass
};