import { Class, Project } from "@/protocols";
import { duplicatedNameError, notFoundError, conflictError } from "@/errors";
import { projectsRepository, classesRepository, studentsRepository } from "@/repositories";

export async function getAllClasses() {
  const classes = await classesRepository.getAll();
  return classes.map((c) => {
    return {
      id: c.id,
      name: c.name,
      numberOfProjects: c._count.ProjectClass,
      numberOfStudents: c._count.Student,
      createdAt: c.createdAt,
    };
  });
}


export async function getClass(id: number) {
  await validateIdClassExistsOrFail(id);
  const class_ = await classesRepository.findById(id);
  return {
    id: class_.id,
    name: class_.name,
    numberOfProjects: class_._count.ProjectClass,
    numberOfStudents: class_._count.Student,
    createdAt: class_.createdAt,
  };
}

export async function listProjectsByClass(id: number) {
  await validateIdClassExistsOrFail(id);
  const class_ = await classesRepository.listProjectsByClass(id);
  return {
    id: class_.id,
    className: class_.name,
    projects: class_.ProjectClass.map((p) => {
      return {
        projectId: p.Project.id,
        projectName: p.Project.name,
        deadline: p.deadline,
      };
    }),
    createdAt: class_.createdAt,
  };
}

export async function listStudentsByClass(classId: number) {
  await validateIdClassExistsOrFail(classId);
  const class_ = await studentsRepository.listStudentsByClass(classId);
  return {
    id: class_.id,
    className: class_.name,
    students: class_.Student.map((s) => {
      return {
        studentId: s.id,
        studentName: s.name,
      };
    }),
    createdAt: class_.createdAt,
  };
}

export async function createClass(classParam: ClassParams): Promise<Class> {
  await validateUniqueNameOrFail(classParam.name);
  return classesRepository.create(classParam.name);
}

export async function applyProject(classId: number, projectId: number, deadline: string) {
  await validateIdClassExistsOrFail(classId);
  await validateIdProjectExistsOrFail(projectId);
  await checkProjectHasApplied(classId, projectId, true);
  return classesRepository.applyProject(classId, projectId, deadline);
}

export async function updateClass(class_: ClassParams, classId: number): Promise<Class> {
  await validateIdClassExistsOrFail(classId);
  await validateUniqueNameOrFail(class_.name);
  return classesRepository.update(classId, class_.name);
}

export async function deleteClass(id: number) {
  await validateIdClassExistsOrFail(id);
  const class_ = await classesRepository.deleteClass(id);
  return { id: class_.id };
}

export async function removeProject(classId: number, projectId: number) {
  await validateIdClassExistsOrFail(classId);
  await validateIdProjectExistsOrFail(projectId);
  const projectClass = await checkProjectHasApplied(classId, projectId, false);
  await classesRepository.removeProject(projectClass.id);
  return { id: projectClass.id };
}

async function validateUniqueNameOrFail(name: string): Promise<void> {
  const classWithSameName: Class = await classesRepository.findByName(name);
  if (classWithSameName) {
    throw duplicatedNameError("class");
  }
}

async function validateIdClassExistsOrFail(classId: number): Promise<void> {
  const classExists: Class = await classesRepository.findById(classId);
  if (!classExists) {
    throw notFoundError("No class was found with this id");
  }
}

async function validateIdProjectExistsOrFail(projectId: number): Promise<void> {
  const projectExists: Project = await projectsRepository.findById(projectId);
  if (!projectExists) {
    throw notFoundError("No project was found with this id");
  }
}

async function checkProjectHasApplied(classId: number, projectId: number, insert: boolean) {
  const projectHasBeenApplied = await classesRepository.findProjectApplied(classId, projectId);
  if (insert) {
    if (projectHasBeenApplied) {
      throw conflictError("This project has already been applied to this class");
    }
  } else {
    if (!projectHasBeenApplied) {
      throw notFoundError("This project was not applied to this class");
    }
  }
  return projectHasBeenApplied;
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
