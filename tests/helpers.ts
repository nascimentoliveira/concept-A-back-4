import { prisma } from "@/config";

export async function cleanDb() {
  await prisma.grade.deleteMany({});
  await prisma.projectClass.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.project.deleteMany({});
}