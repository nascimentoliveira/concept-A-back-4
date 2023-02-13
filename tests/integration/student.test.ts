import app, { init, close } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createClass, createStudent } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe("POST /students", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/students");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.post("/students").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = (classId: number) => ({
      name: faker.name.fullName().slice(0, 70),
      classId: classId,
    });

    it("should respond with status 409 when there is already a student with the same name", async () => {
      const _class = await createClass();
      const body = generateValidBody(_class.id);
      await createStudent(body);
      const response = await server.post("/students").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 404 when classId is non-existent", async () => {
      const _class = await createClass();
      const body = generateValidBody(_class.id+1);
      const response = await server.post("/students").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 201 with student data", async () => {
      const _class = await createClass();
      const body = generateValidBody(_class.id);
      const response = await server.post("/students").send(body);
      const student = await prisma.student.findUnique({
        where: { name: body.name },
      });
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: student.id,
          name: student.name,
          classId: _class.id,
          createdAt: student.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("GET /students", () => {
  it("should respond with status 200 and empty data array when it has no registered student", async () => {
    const response = await server.get("/students");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([]))
  });

  it("should respond with status 200 with students data", async () => {
    const _class = await createClass();
    await createStudent({ classId: _class.id });
    await createStudent({ classId: _class.id });
    const response = await server.get("/students");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        classId: _class.id,
        createdAt: expect.any(String),
      })
    ]));
  });
});

describe("GET /students/:studentId", () => {
  it("should respond with status 404 when studentId is non-existent", async () => {
    const response = await server.get("/students/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with student data", async () => {
    const _class = await createClass();
    const student = await createStudent({ classId: _class.id });
    const response = await server.get(`/students/${student.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: student.id,
        name: student.name,
        classId: _class.id,
        createdAt: student.createdAt.toISOString(),
      })
    );
  });
});

describe("GET /students/classes/:classId", () => {
  it("should respond with status 200 with classes data and empty students array", async () => {
    const _class = await createClass();
    const response = await server.get(`/students/classes/${_class.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: _class.id,
        className: _class.name,
        students: expect.arrayContaining([]),
        createdAt: _class.createdAt.toISOString(),
      })
    );
  });

  it("should respond with status 200 with classes data and students array", async () => {
    const _class = await createClass();
    await createStudent({ classId: _class.id });
    await createStudent({ classId: _class.id });
    const response = await server.get(`/students/classes/${_class.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.students).toHaveLength(2);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: _class.id,
        className: _class.name,
        students: expect.arrayContaining([
          expect.objectContaining({
            studentId: expect.any(Number),
            studentName: expect.any(String),
          })
        ]),
        createdAt: _class.createdAt.toISOString(),
      })
    );
  });
});

describe("PATCH /students/:studentId", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.patch("/students/0");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.patch("/students/0").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = (classId: number) => ({
      name: faker.name.fullName().slice(0, 70),
      classId: classId,
    });

    it("should respond with status 404 when studentId is non-existent", async () => {
      const _class = await createClass();
      const body = generateValidBody(_class.id);
      const response = await server.patch("/students/0").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 when there is already a student with the same name", async () => {
      const _class = await createClass();
      const body1 = generateValidBody(_class.id);
      await createStudent(body1);
      const body2 = generateValidBody(_class.id);
      const student = await createStudent(body2);
      const response = await server.patch(`/students/${student.id}`).send(body1);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 200 with student data", async () => {
      const _class = await createClass();
      const student = await createStudent({ classId: _class.id });
      const body = generateValidBody(_class.id);
      const response = await server.patch(`/students/${student.id}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: student.id,
          name: body.name,
          classId: _class.id,
          createdAt: student.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("DELETE /students/:studentId", () => {
  it("should respond with status 404 when studentId is non-existent", async () => {
    const response = await server.delete("/students/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with id student", async () => {
    const _class = await createClass();
    const student = await createStudent({ classId: _class.id });
    const response = await server.delete(`/students/${student.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: student.id,
      })
    );
  });
});
