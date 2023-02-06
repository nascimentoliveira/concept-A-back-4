import { faker } from "@faker-js/faker"
import { Class } from "@/protocols";
import { prisma } from "@/config";

export function createClass(_class: Partial<Class> = {}): Promise<Class> {
  return prisma.class.create({
    data: {
      name: _class.name || `Class ${faker.datatype.number()}`.slice(0, 30),
    },
  });
}
