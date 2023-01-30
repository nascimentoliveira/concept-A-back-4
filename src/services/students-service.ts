import { QueryResult } from "pg";
import { Student } from "@/protocols";
import { duplicatedNameError, notFoundError } from "@/errors";
import { studentsRepository, classesRepository } from "@/repositories";

export async function getAllStudents(): Promise<Student[]> {
  return studentsRepository.getAll();
}

export async function getStudentById(id: number): Promise<Student> {
  await validateStudentIdExistsOrFail(id);
  return studentsRepository.findById(id);
}

export async function getStudentsByClass(classId: number) {
  await validateClassIdExistsOrFail(classId);
  return studentsRepository.listStudentsByClass(classId);
}

export async function createStudent(student: StudentParams): Promise<Student> {
  await validateUniqueNameOrFail(student.name);
  await validateClassIdExistsOrFail(student.classId);
  return studentsRepository.create(student.name, student.classId);
}

export async function updateStudent(student: StudentParams, studentId: number): Promise<Student> {
  await validateStudentIdExistsOrFail(studentId);
  await validateClassIdExistsOrFail(student.classId);
  await validateUniqueNameOrFail(student.name, studentId);
  return studentsRepository.update(studentId, student.name, student.classId);
}

export async function deleteStudent(id: number): Promise<Student> {
  await validateStudentIdExistsOrFail(id);
  return studentsRepository.deleteStudent(id);
}

async function validateUniqueNameOrFail(name: string, studentId?: number): Promise<void> {
  const studentWithSameName: Student = await studentsRepository.findByName(name);
  if (studentId) {
    if (studentWithSameName && studentId !== studentWithSameName.id) {
      throw duplicatedNameError("student");
    }
  } else {
    if (studentWithSameName) {
      throw duplicatedNameError("student");
    }
  }
}

async function validateStudentIdExistsOrFail(id: number): Promise<void> {
  const studentExists: Student = await studentsRepository.findById(id);
  if (!studentExists) {
    throw notFoundError("No student was found with this id");
  }
}

async function validateClassIdExistsOrFail(id: number): Promise<void> {
  const classExists: QueryResult = await classesRepository.findById(id);
  if (!classExists.rowCount) {
    throw notFoundError("No class was found with this id");
  }
}

export type StudentParams = Pick<Student, "name" | "classId">;

export const studentsService = {
  getAllStudents,
  getStudentById,
  getStudentsByClass,
  createStudent,
  updateStudent,
  deleteStudent,
};
