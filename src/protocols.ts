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
