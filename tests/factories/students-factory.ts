import { faker } from "@faker-js/faker"
import { prisma } from "@/config";
import { Student } from "@/protocols";

export async function createStudent(student: Partial<Student> = {}, min?: number, max?: number): Promise<Student> {
  return prisma.student.create({
    data: {
      name: student.name || faker.name.fullName(),
      classId: student.classId || faker.datatype.number({
        min: min, max: max
      }),
    },
  });
}
