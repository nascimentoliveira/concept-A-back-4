import { Class } from "@/protocols";
import { prisma } from "@/config";
import { ProjectClass } from "@prisma/client";

function getAll() {
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

function findById(id: number) {
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

function listProjectsByClass(id: number) {
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
            }
          }
        }
      }
    }
  });
}

function create(name: string): Promise<Class> {
  return prisma.class.create({
    data: { name },
  });
}

function update(id: number, name: string): Promise<Class> {
  return prisma.class.update({
    where: { id },
    data: { name },
  });
}

function deleteClass(id: number): Promise<Class> {
  return prisma.class.delete({
    where: { id },
  });
}

function applyProject(classId: number, projectId: number, deadline: string): Promise<ProjectClass> {
  return prisma.projectClass.create({
    data: { classId, projectId, deadline },
  });
}

function findProjectApplied(classId: number, projectId: number): Promise<ProjectClass> {
  return prisma.projectClass.findFirst({
    where: { classId, projectId }
  });
}

function removeProject(id: number): Promise<ProjectClass> {
  return prisma.projectClass.delete({
    where: { id },
  });
}

export const classesRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteClass,
  listProjectsByClass,
  findProjectApplied,
  applyProject,
  removeProject,
};
