import { Class } from "@/protocols";
import { prisma } from "@/config";
import { ClassParams, ClassReturnRep, ClassReturnWithProjectsListRep } from "@/services";

function getAll(): Promise<ClassReturnRep[]> {
  return prisma.class.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          ProjectClass: true,
          Student: true,
        },
      },
      createdAt: true,
    },
  });
}

function findById(id: number): Promise<ClassReturnRep> {
  return prisma.class.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          ProjectClass: true,
          Student: true,
        },
      },
      createdAt: true,
    }
  });
}

function findByName(name: string): Promise<Class> {
  return prisma.class.findUnique({
    where: { name },
  });
}

function create(classParam: ClassParams): Promise<Class> {
  return prisma.class.create({
    data: classParam,
  });
}

function update(id: number, classParam: ClassParams): Promise<Class> {
  return prisma.class.update({
    where: { id },
    data: classParam,
  });
}

function deleteClass(id: number): Promise<Class> {
  return prisma.class.delete({
    where: { id },
  });
}

function listProjectsByClass(id: number): Promise<ClassReturnWithProjectsListRep> {
  return prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      ProjectClass: {
        include: {
          Project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
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
        },
      },
    },
  });
}

export const classRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteClass,
  listProjectsByClass,
  listStudentsByClass,
};
