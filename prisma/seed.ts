import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  await prisma.class.createMany({
    data: [
      {
        name: "Turma 1",
      },
      {
        name: "Turma 2",
      },
      {
        name: "Turma 3",
      },
      {
        name: "Turma 4",
      },
      {
        name: "Turma 5",
      },
    ]
  });
  await prisma.project.createMany({
    data: [
      {
        name: "ZapRecall",
      },
      {
        name: "CineFlex",
      },
      {
        name: "TrackIt",
      },
      {
        name: "MyWallet",
      },
      {
        name: "Shortly",
      },
    ]
  });
  await prisma.projectClass.createMany({
    data: [
      {
        projectId: 1,
        classId: 1,
        deadline: dayjs().subtract(1, "days").toDate(),
      },
      {
        projectId: 2,
        classId: 2,
        deadline: dayjs().add(1, "days").toDate(),
      },
      {
        projectId: 3,
        classId: 3,
        deadline: dayjs().add(2, "days").toDate(),
      },
      {
        projectId: 4,
        classId: 4,
        deadline: dayjs().add(3, "days").toDate(),
      },
      {
        projectId: 5,
        classId: 5,
        deadline: dayjs().add(4, "days").toDate(),
      },
      {
        projectId: 4,
        classId: 5,
        deadline: dayjs().add(5, "days").toDate(),
      },
    ]
  });
  await prisma.student.createMany({
    data: [
      {
        name: "Aluno 1",
        classId: 1,
      },
      {
        name: "Aluno 2",
        classId: 2,
      },
      {
        name: "Aluno 3",
        classId: 3,
      },
      {
        name: "Aluno 4",
        classId: 4,
      },
      {
        name: "Aluno 5",
        classId: 5,
      },
      {
        name: "Aluno 6",
        classId: 1,
      },
    ]
  });
  await prisma.grade.createMany({
    data: [
      {
        studentId: 1,
        projectClassId: 1,
        grade: 10,
      },
      {
        studentId: 2,
        projectClassId: 2,
        grade: 9,
      },
      {
        studentId: 3,
        projectClassId: 3,
        grade: 8,
      },
      {
        studentId: 4,
        projectClassId: 4,
        grade: 7,
      },
      {
        studentId: 5,
        projectClassId: 5,
        grade: 7,
      },
      {
        studentId: 5,
        projectClassId: 6,
        grade: 8,
      },
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
