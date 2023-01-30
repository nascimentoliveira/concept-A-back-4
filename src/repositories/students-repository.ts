import { prisma } from "@/config";
import { Student } from "@/protocols";

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

function listStudentsByClass(id: number) {
  return prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      Student: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
}

function create(name: string, classId: number): Promise<Student> {
  return prisma.student.create({
    data: { name, classId },
  });
}

function update(id: number, name: string, classId: number): Promise<Student> {
  return prisma.student.update({
    where: { id },
    data: { name, classId },
  });
}

function deleteStudent(id: number): Promise<Student> {
  return prisma.student.delete({
    where: { id },
  });
}

export const studentsRepository = {
  getAll,
  findById,
  findByName,
  listStudentsByClass,
  create,
  update,
  deleteStudent
};