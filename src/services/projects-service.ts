import { QueryResult } from "pg";

import { Project } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { projectsRepository } from "../repositories/projects-repository.js";

export async function getAllProjects(): Promise<QueryResult> {
  return projectsRepository.getAll();
}

export async function getProject(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return projectsRepository.findById(id);
}

export async function createProject(project: ProjectParams): Promise<QueryResult> {

  await validateUniqueNameOrFail(project.name);

  return projectsRepository.create(project.name);
}

export async function updateProject(project: ProjectParams, projectId: number): Promise<QueryResult> {

  await validateIdExistsOrFail(projectId);

  await validateUniqueNameOrFail(project.name);

  return projectsRepository.update(projectId, project.name);
}

export async function deleteProject(id: number): Promise<QueryResult> {

  await validateIdExistsOrFail(id);

  return projectsRepository.deleteProject(id);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const projectWithSameName = await projectsRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError("project");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const projectExists = await projectsRepository.findById(id);
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