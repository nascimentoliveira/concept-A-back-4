import { QueryResult } from "pg";

import { Class } from "../../protocols.js";
import { duplicatedNameError } from "./erros.js";
import classRepository from "../../repositories/class-repository.js";

export async function createClass(classParam: CreateClassParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(classParam.name);

  return classRepository.create(classParam.name);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await classRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError();
  }
}

export type CreateClassParams = Pick<Class, "name">;

const classesService = {
  createClass
};

export default classesService;