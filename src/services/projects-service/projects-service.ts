import { QueryResult } from "pg";

import { Project } from "../../protocols.js";
import { duplicatedNameError } from "./erros.js";
import projectRepository from "../../repositories/project-repository.js";

export async function createProject(project: CreateProjectParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(project.name);

  return projectRepository.create(project.name);
}

export async function updateProject(project: UpdateProjectParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(project.name);

  return projectRepository.update(project.id, project.name);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await projectRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError();
  }
}

export type CreateProjectParams = Pick<Project, "name">;
export type UpdateProjectParams = Pick<Project, "id" | "name">;

const projectsService = {
  createProject,
  updateProject
};

export default projectsService;