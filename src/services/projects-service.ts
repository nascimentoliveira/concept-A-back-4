import { QueryResult } from "pg";

import { Project } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { projectRepository } from "../repositories/project-repository.js";

export async function getAllProjects(): Promise<QueryResult> {
  return projectRepository.getAll();
}

export async function getProject(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return projectRepository.findById(id);
}

export async function createProject(project: ProjectParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(project.name);

  return projectRepository.create(project.name);
}

export async function updateProject(project: ProjectParams, projectId: number): Promise<QueryResult> {

  await validateIdExistsOrFail(projectId);

  await validateUniqueNameOrFail(project.name);

  return projectRepository.update(projectId, project.name);
}

export async function deleteProject(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return projectRepository.deleteProject(id);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await projectRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError("project");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const projectExists = await projectRepository.findById(id);
  if (!projectExists.rowCount) {
    throw notFoundError("project", "id");
  }
}

export type ProjectParams = Pick<Project, "name">;

export const projectsService = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};