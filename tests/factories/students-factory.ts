import { faker } from "@faker-js/faker"
import { prisma } from "@/config";
import { Student } from "@/protocols";

export function createStudent(student: Partial<Student> = {}, min?: number, max?: number): Promise<Student> {
  return prisma.student.create({
    data: {
      name: student.name || faker.name.fullName().slice(0, 70),
      classId: student.classId || faker.datatype.number({
        min: min, max: max
      }),
    },
  });
}
