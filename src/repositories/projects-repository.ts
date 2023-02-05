import { prisma } from "@/config";
import { Project } from "@/protocols";
import { ProjectParams } from "@/services";

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

function create(projectParams: ProjectParams): Promise<Project> {
  return prisma.project.create({
    data: projectParams,
  });
}

function update(id: number, projectParams: ProjectParams): Promise<Project> {
  return prisma.project.update({
    where: { id },
    data: projectParams,
  });
}

function deleteProject(id: number): Promise<Project> {
  return prisma.project.delete({
    where: { id },
  });
}

export const projectRepository = {
  getAll,
  findById,
  findByName,
  create,
  update,
  deleteProject,
};
