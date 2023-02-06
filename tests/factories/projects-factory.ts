import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import { Project } from "@/protocols";

export function createProject(project: Partial<Project> = {}): Promise<Project> {
  return prisma.project.create({
    data: {
      name: project.name || `Project ${faker.commerce.productName()}`.slice(0, 30),
    },
  });
}
