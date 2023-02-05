import { prisma } from "@/config";
import { Student } from "@/protocols";
import { StudentParams } from "@/services";

function getAll(): Promise<Student[]> {
  return prisma.student.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
}

function findById(id: number): Promise<Student> {
  return prisma.student.findUnique({
    where: { id },
  });
}

function findByName(name: string): Promise<Student> {
  return prisma.student.findUnique({
    where: { name },
  });
}

function create(student: StudentParams): Promise<Student> {
  return prisma.student.create({
    data: student,
  });
}

function update(id: number, student: StudentParams): Promise<Student> {
  return prisma.student.update({
    where: { id },
    data: student,
  });
}

function deleteStudent(id: number): Promise<Student> {
  return prisma.student.delete({
    where: { id },
  });
}

export const studentRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteStudent,
};
