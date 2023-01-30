import { QueryResult } from "pg";
import { Class, Project } from "@/protocols";
import { duplicatedNameError, notFoundError, conflictError } from "@/errors";
import { projectsRepository, classesRepository, studentsRepository } from "@/repositories";

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

export async function listStudentsByClass(classId: number) {
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
  await checkProjectHasApplied(classId, projectId, true);
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
  await checkProjectHasApplied(classId, projectId, false);
  return classesRepository.removeProject(classId, projectId);
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const classWithSameName: QueryResult = await classesRepository.findByName(name);
  if (classWithSameName.rowCount) {
    throw duplicatedNameError("class");
  }
}

async function validateIdClassExistsOrFail(classId: number): Promise<void> {
  const classExists: QueryResult = await classesRepository.findById(classId);
  if (!classExists.rowCount) {
    throw notFoundError("No class was found with this id");
  }
}

async function validateIdProjectExistsOrFail(projectId: number): Promise<void> {
  const projectExists: Project = await projectsRepository.findById(projectId);
  if (!projectExists) {
    throw notFoundError("No project was found with this id");
  }
}

async function checkProjectHasApplied(classId: number, projectId: number, insert: boolean): Promise<void> {
  const projectHasBeenApplied: QueryResult = await classesRepository.findProjectApplied(classId, projectId);
  if (insert) {
    if (projectHasBeenApplied.rowCount) {
      throw conflictError("This project has already been applied to this class");
    }
  } else {
    if (!projectHasBeenApplied.rowCount) {
      throw notFoundError("This project was not applied to this class");
    }
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
  removeProject,
};
