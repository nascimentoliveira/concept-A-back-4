import {
  Class,
  ClassReturn,
  ClassWithProjectsListReturn,
  ClassWithStudentsListReturn,
  Project,
  ProjectClass,
} from "@/protocols";
import { duplicatedNameError, notFoundError, conflictError } from "@/errors";
import { projectRepository, classRepository, projectClassRepository } from "@/repositories";

export async function getAllClasses(): Promise<ClassReturn[]> {
  const classes: ClassReturnRep[] = await classRepository.getAll();
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

export async function getClass({ id }: Pick<Class, "id">): Promise<ClassReturn> {
  await validateIdClassExistsOrFail(id);
  const _class: ClassReturnRep = await classRepository.findById(id);
  return {
    id: _class.id,
    name: _class.name,
    numberOfProjects: _class._count.ProjectClass,
    numberOfStudents: _class._count.Student,
    createdAt: _class.createdAt,
  };
}

export async function listProjectsByClass({ id }: Pick<Class, "id">): Promise<ClassWithProjectsListReturn> {
  await validateIdClassExistsOrFail(id);
  const _class: ClassReturnWithProjectsListRep = await classRepository.listProjectsByClass(id);
  return {
    id: _class.id,
    className: _class.name,
    projects: _class.ProjectClass.map((p) => {
      return {
        projectId: p.Project.id,
        projectName: p.Project.name,
        deadline: p.deadline,
      };
    }),
    createdAt: _class.createdAt,
  };
}

export async function listStudentsByClass({ id }: Pick<Class, "id">): Promise<ClassWithStudentsListReturn> {
  await validateIdClassExistsOrFail(id);
  const _class: ClassReturnWithStudentsListRep = await classRepository.listStudentsByClass(id);
  return {
    id: _class.id,
    className: _class.name,
    students: _class.Student.map((s) => {
      return {
        studentId: s.id,
        studentName: s.name,
      };
    }),
    createdAt: _class.createdAt,
  };
}

export async function createClass(classParam: ClassParams): Promise<Class> {
  await validateUniqueNameOrFail(classParam);
  return classRepository.create(classParam);
}

export async function applyProject(projectClassParams: ProjectClassParams): Promise<ProjectClass> {
  await validateIdClassExistsOrFail(projectClassParams.classId);
  await validateIdProjectExistsOrFail(projectClassParams.projectId);
  await checkProjectHasApplied(
    { classId: projectClassParams.classId, projectId: projectClassParams.projectId }, true);
  return projectClassRepository.applyProject(projectClassParams);
}

export async function updateClass(classParam: ClassParams, { id }: Pick<Class, "id">): Promise<Class> {
  await validateIdClassExistsOrFail(id);
  await validateUniqueNameOrFail(classParam);
  return classRepository.update(id, classParam);
}

export async function deleteClass({ id }: Pick<Class, "id">): Promise<Class> {
  await validateIdClassExistsOrFail(id);
  return classRepository.deleteClass(id);;
}

export async function removeProject(projectClassParams: Omit<ProjectClassParams, "deadline">): Promise<ProjectClass> {
  await validateIdClassExistsOrFail(projectClassParams.classId);
  await validateIdProjectExistsOrFail(projectClassParams.projectId);
  const projectClass: ProjectClass = await checkProjectHasApplied(
    { classId: projectClassParams.classId, projectId: projectClassParams.projectId }, false);
  await projectClassRepository.removeProject(projectClass.id);
  return projectClass;
}

async function validateUniqueNameOrFail(classParam: ClassParams): Promise<void> {
  const classWithSameName: Class = await classRepository.findByName(classParam.name);
  if (classWithSameName) {
    throw duplicatedNameError("class");
  }
}

async function validateIdClassExistsOrFail(classId: number): Promise<void> {
  const classExists: Class = await classRepository.findById(classId);
  if (!classExists) {
    throw notFoundError("No class was found with this id");
  }
}

async function validateIdProjectExistsOrFail(projectId: number): Promise<void> {
  const projectExists: Project = await projectRepository.findById(projectId);
  if (!projectExists) {
    throw notFoundError("No project was found with this id");
  }
}

async function checkProjectHasApplied(
  projectClassParams: Omit<ProjectClassParams, "deadline">,
  insert: boolean): Promise<ProjectClass> {

  const projectHasBeenApplied: ProjectClass = await projectClassRepository.findProjectApplied(projectClassParams);
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
export type ProjectClassParams = Omit<ProjectClass, "id" | "createdAt">;
export type ClassReturnWithProjectsListRep = Class & {
  ProjectClass: (
    ProjectClass & {
      Project: Omit<Project, "createdAt">
    })[]
};

export type ClassReturnWithStudentsListRep = Class & {
  Student: {
    id: number
    name: string
  }[],
};

export type ClassReturnRep = Class & {
  _count: {
    Student: number
    ProjectClass: number
  },
};

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
