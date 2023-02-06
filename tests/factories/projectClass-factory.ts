import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import { ProjectClass } from "@/protocols";
import dayjs from "dayjs";

export async function assignProjectClass(projectClass: Partial<ProjectClass> = {}): Promise<ProjectClass> {
  return prisma.projectClass.create({
    data: {
      projectId: projectClass.projectId || faker.datatype.number(),
      classId: projectClass.classId || faker.datatype.number(),
      deadline: projectClass.deadline || dayjs().add(5, "days").toDate(),
    },
  });
}