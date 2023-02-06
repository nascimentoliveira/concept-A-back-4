export type ApplicationError = {
  name: string;
  message: string;
};

export type Project = {
  id: number
  name: string
  createdAt: Date
};

export type Class = {
  id: number
  name: string
  createdAt: Date
};

export type Student = {
  id: number
  name: string
  classId: number
  createdAt: Date
};

export type Grade = {
  id: number
  studentId: number
  projectClassId: number
  grade: number
  createdAt: Date
};

export type ProjectClass = {
  id: number
  projectId: number
  classId: number
  deadline: Date
  createdAt: Date
};

export type ClassReturn = Class & {
  numberOfProjects: number
  numberOfStudents: number
};

export type ClassWithProjectsListReturn = {
  id: number
  className: string
  projects: {
    projectId: number
    projectName: string
    deadline: Date
  }[];
  createdAt: Date
};

export type ClassWithStudentsListReturn = {
  id: number
  className: string
  students: {
    studentId: number
    studentName: string
  }[]
  createdAt: Date
};
