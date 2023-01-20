import { QueryResult } from "pg";

import { Project } from "../../protocols.js";
import { duplicatedNameError } from "./erros.js";
import projectRepository from "../../repositories/project-repository.js";

export async function createProject(project: CreateProjectParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(project.name);

  return projectRepository.create(project.name);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await projectRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError();
  }
}

export type CreateProjectParams = Pick<Project, "name">;

const projectsService = {
  createProject
};

export default projectsService;