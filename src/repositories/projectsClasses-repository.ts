import { prisma } from "@/config";
import { ProjectClassParams } from "@/services";
import { ProjectClass } from "@prisma/client";


function applyProject(projectClassParams: ProjectClassParams): Promise<ProjectClass> {
  return prisma.projectClass.create({
    data: projectClassParams,
  });
}

function findProjectApplied(projectClassParams: Omit<ProjectClassParams, "deadline">): Promise<ProjectClass> {
  return prisma.projectClass.findFirst({
    where: projectClassParams,
  });
}

function removeProject(id: number): Promise<ProjectClass> {
  return prisma.projectClass.delete({
    where: { id },
  });
}

export const projectClassRepository = {
  findProjectApplied,
  applyProject,
  removeProject,
};
