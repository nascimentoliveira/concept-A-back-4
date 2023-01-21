import { QueryResult } from "pg";

import { Student } from "../protocols.js";
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { studentsRepository } from "../repositories/students-repository.js";
import { classesRepository } from "../repositories/classes-repository.js";

export async function getAllStudents(): Promise<QueryResult> {
  return studentsRepository.getAll();
}

export async function getStudentById(id: number): Promise<QueryResult> {
  await validateStudentIdExistsOrFail(id);

  return studentsRepository.findById(id);
}

export async function getStudentsByClass(classId: number): Promise<QueryResult> {
  await validateClassIdExistsOrFail(classId);

  return studentsRepository.findByClass(classId);
}

export async function createStudent(student: StudentParams): Promise<QueryResult> {
  await validateUniqueNameOrFail(student.name);

  await validateClassIdExistsOrFail(student.classId);

  return studentsRepository.create(student.name, student.classId);
}

export async function updateStudent(student: StudentParams, studentId: number): Promise<QueryResult> {
  await validateStudentIdExistsOrFail(studentId);

  await validateClassIdExistsOrFail(student.classId);

  await validateUniqueNameOrFail(student.name, studentId);

  return studentsRepository.update(studentId, student.name, student.classId);
}

export async function deleteStudent(id: number): Promise<QueryResult> {
  await validateStudentIdExistsOrFail(id);

  return studentsRepository.deleteStudent(id);
}

async function validateUniqueNameOrFail(name: string, studentId?: number): Promise<void> {
  const studentWithSameName = await studentsRepository.findByName(name);

  if (studentId) {
    if (studentWithSameName.rowCount && studentId !== studentWithSameName.rows[0].id) {
      throw duplicatedNameError("student");
    }
  } else {
    if (studentWithSameName.rowCount) {
      throw duplicatedNameError("student");
    }
  }
}

async function validateStudentIdExistsOrFail(id: number): Promise<void> {
  const studentExists = await studentsRepository.findById(id);
  if (!studentExists.rowCount) {
    throw notFoundError("student", "id");
  }
}

async function validateClassIdExistsOrFail(id: number): Promise<void> {
  const classExists = await classesRepository.findById(id);
  if (!classExists.rowCount) {
    throw notFoundError("class", "id");
  }
}

export type StudentParams = Pick<Student, "name" | "classId">;

export const studentsService = {
  getAllStudents,
  getStudentById,
  getStudentsByClass,
  createStudent,
  updateStudent,
  deleteStudent
};