import { prisma } from "@/config";
import { Project } from "@/protocols";

function getAll(): Promise<Project[]> {
  return prisma.project.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
}

function findById(id: number): Promise<Project> {
  return prisma.project.findUnique({
    where: { id },
  });
}

function findByName(name: string): Promise<Project> {
  return prisma.project.findUnique({
    where: { name },
  });
}

function create(name: string): Promise<Project> {
  return prisma.project.create({
    data: { name },
  });
}

function update(id: number, name: string): Promise<Project> {
  return prisma.project.update({
    where: { id },
    data: { name },
  });
}

function deleteProject(id: number): Promise<Project> {
  return prisma.project.delete({
    where: { id },
  });
}

export const projectsRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteProject
};