import { QueryResult } from "pg";

import { Project } from "@/protocols";
import { duplicatedNameError, notFoundError } from "@/errors";
import { projectsRepository } from "@/repositories";

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
  const projectWithSameName: QueryResult = await projectsRepository.findByName(name);
  if (projectWithSameName.rowCount) {
    throw duplicatedNameError("project");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const projectExists: QueryResult = await projectsRepository.findById(id);
  if (!projectExists.rowCount) {
    throw notFoundError("No project was found with this id");
  }
}

export type ProjectParams = Pick<Project, "name">;

export const projectsService = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
