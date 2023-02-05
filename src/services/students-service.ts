import { Class, Student } from "@/protocols";
import { duplicatedNameError, notFoundError } from "@/errors";
import { studentRepository, classRepository } from "@/repositories";

export async function getAllStudents(): Promise<Student[]> {
  return studentRepository.getAll();
}

export async function getStudentById({ id }: Pick<Student, "id">): Promise<Student> {
  await validateStudentIdExistsOrFail(id);
  return studentRepository.findById(id);
}

export async function createStudent(student: StudentParams): Promise<Student> {
  await validateUniqueNameOrFail(student.name);
  await validateClassIdExistsOrFail(student.classId);
  return studentRepository.create(student);
}

export async function updateStudent(student: StudentParams, { id }: Pick<Student, "id">): Promise<Student> {
  await validateStudentIdExistsOrFail(id);
  await validateClassIdExistsOrFail(student.classId);
  await validateUniqueNameOrFail(student.name, id);
  return studentRepository.update(id, student);
}

export async function deleteStudent({ id }: Pick<Student, "id">): Promise<Student> {
  await validateStudentIdExistsOrFail(id);
  const student: Student = await studentRepository.deleteStudent(id);
  return student;
}

async function validateUniqueNameOrFail(name: string, studentId?: number): Promise<void> {
  const studentWithSameName: Student = await studentRepository.findByName(name);
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
  const studentExists: Student = await studentRepository.findById(id);
  if (!studentExists) {
    throw notFoundError("No student was found with this id");
  }
}

async function validateClassIdExistsOrFail(id: number): Promise<void> {
  const classExists: Class = await classRepository.findById(id);
  if (!classExists) {
    throw notFoundError("No class was found with this id");
  }
}

export type StudentParams = Pick<Student, "name" | "classId">;

export const studentsService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
