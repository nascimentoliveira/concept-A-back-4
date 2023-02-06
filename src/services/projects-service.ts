import { Project } from "@/protocols";
import { duplicatedNameError, notFoundError } from "@/errors";
import { projectRepository } from "@/repositories";

export async function getAllProjects(): Promise<Project[]> {
  return projectRepository.getAll();
}

export async function getProject({ id }: Pick<Project, "id">): Promise<Project> {
  await validateIdExistsOrFail(id);
  return projectRepository.findById(id);
}

export async function createProject(project: ProjectParams): Promise<Project> {
  await validateUniqueNameOrFail(project);
  return projectRepository.create(project);
}

export async function updateProject(project: ProjectParams, { id }: Pick<Project, "id">): Promise<Project> {
  await validateIdExistsOrFail(id);
  await validateUniqueNameOrFail(project);
  return projectRepository.update(id, project);
}

export async function deleteProject({ id }: Pick<Project, "id">): Promise<Project> {
  await validateIdExistsOrFail(id);
  return projectRepository.deleteProject(id);
}

async function validateUniqueNameOrFail(project: ProjectParams): Promise<void> {
  const projectWithSameName: Project = await projectRepository.findByName(project.name);
  if (projectWithSameName) {
    throw duplicatedNameError("project");
  }
}

async function validateIdExistsOrFail(id: number): Promise<void> {
  const projectExists: Project = await projectRepository.findById(id);
  if (!projectExists) {
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
