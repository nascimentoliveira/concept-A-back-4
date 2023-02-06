import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import httpStatus from "http-status";
import supertest from "supertest";
import { createClass, createProject, createStudent, assignProjectClass } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("POST /classes", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/classes");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.post("/classes").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: `Class ${faker.datatype.number()}`.slice(0, 30),
    });

    it("should respond with status 409 when there is already a class with the same name", async () => {
      const body = generateValidBody();
      await createClass(body);
      const response = await server.post("/classes").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 with class data", async () => {
      const body = generateValidBody();
      const response = await server.post("/classes").send(body);
      const _class = await prisma.class.findUnique({
        where: { name: body.name },
      });
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: _class.id,
          name: _class.name,
          createdAt: _class.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("GET /classes", () => {

  it("should respond with status 200 and empty data array when it has no registered class", async () => {
    const response = await server.get("/classes");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([]))
  });

  it("should respond with status 200 with classes data", async () => {
    const _class = await createClass();
    const response = await server.get("/classes");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        numberOfProjects: expect.any(Number),
        numberOfStudents: expect.any(Number),
        createdAt: expect.any(String),
      })
    ]));
  });
});

describe("GET /classes/:classId", () => {
  it("should respond with status 404 when classId is non-existent", async () => {
    const response = await server.get("/classes/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with classes data", async () => {
    const _class = await createClass();
    const response = await server.get(`/classes/${_class.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: _class.id,
        name: _class.name,
        numberOfProjects: 0,
        numberOfStudents: 0,
        createdAt: _class.createdAt.toISOString(),
      })
    );
  });

  describe("GET /classes/:classId/projects", () => {
    it("should respond with status 200 with classes data and empty projects array", async () => {
      const _class = await createClass();
      const response = await server.get(`/classes/${_class.id}/projects`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: _class.id,
          className: _class.name,
          projects: expect.arrayContaining([]),
          createdAt: _class.createdAt.toISOString(),
        })
      );
    });

    it("should respond with status 200 with classes data and projects array", async () => {
      const _class = await createClass();
      const project = await createProject();
      const projectClass = await assignProjectClass({ classId: _class.id, projectId: project.id })
      const response = await server.get(`/classes/${_class.id}/projects`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: _class.id,
          className: _class.name,
          projects: expect.arrayContaining([
            expect.objectContaining({
              projectId: project.id,
              projectName: project.name,
              deadline: projectClass.deadline.toISOString(),
            })
          ]),
          createdAt: _class.createdAt.toISOString(),
        })
      );
    });
  });

  describe("GET /classes/:classId/students", () => {
    it("should respond with status 200 with classes data and empty students array", async () => {
      const _class = await createClass();
      const response = await server.get(`/classes/${_class.id}/students`);
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
      const student = await createStudent({ classId: _class.id });
      const response = await server.get(`/classes/${_class.id}/students`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: _class.id,
          className: _class.name,
          students: expect.arrayContaining([
            expect.objectContaining({
              studentId: student.id,
              studentName: student.name,
            })
          ]),
          createdAt: _class.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("PATCH /classes/:classId", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.patch("/classes/0");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.patch("/classes/0").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: `Class ${faker.datatype.number()}`.slice(0, 30),
    });

    it("should respond with status 404 when classId is non-existent", async () => {
      const body = generateValidBody();
      const response = await server.patch("/classes/0").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 when there is already a project with the same name", async () => {
      const body1 = generateValidBody();
      await createClass(body1);
      const body2 = generateValidBody();
      const _class = await createClass(body2);
      const response = await server.patch(`/classes/${_class.id}`).send(body1);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 200 with class data", async () => {
      const body = generateValidBody();
      const _class = await createClass();
      const response = await server.patch(`/classes/${_class.id}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: _class.id,
          name: body.name,
          createdAt: _class.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("DELETE /classes/:classId", () => {
  it("should respond with status 404 when classId is non-existent", async () => {
    const response = await server.delete("/classes/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with id project-class", async () => {
    const _class = await createClass();
    const response = await server.delete(`/classes/${_class.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: _class.id,
      })
    );
  });
});

describe("POST /classes/:classId/projects/:projectId", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/classes/0/projects/0");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.post("/classes/0/projects/0").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      deadline: dayjs().add(5, "days").toDate(),
    });

    it("should respond with status 404 when classId is non-existent", async () => {
      const body = generateValidBody();
      const response = await server.post("/classes/0/project/0").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 404 when projectId is non-existent", async () => {
      const body = generateValidBody();
      const _class = await createClass();
      const response = await server.post(`/classes/${_class.id}/projects/0`).send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 when the project has already been applied to the class", async () => {
      const body = generateValidBody();
      const _class = await createClass();
      const project = await createProject();
      await assignProjectClass({ classId: _class.id, projectId: project.id })
      const response = await server.post(`/classes/${_class.id}/projects/${project.id}`).send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 with project-class data", async () => {
      const body = generateValidBody();
      const _class = await createClass();
      const project = await createProject();
      const response = await server.post(`/classes/${_class.id}/projects/${project.id}`).send(body);
      const projectClass = await prisma.projectClass.findFirst({
        where: {
          projectId: project.id,
          classId: _class.id,
        },
      });
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: projectClass.id,
          projectId: project.id,
          classId: _class.id,
          deadline: body.deadline.toISOString(),
          createdAt: projectClass.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("DELETE /classes/:classId/projects/:projectId", () => {
  it("should respond with status 404 when classId is non-existent", async () => {
    const response = await server.delete("/classes/0/project/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 404 when projectId is non-existent", async () => {
    const _class = await createClass();
    const response = await server.delete(`/classes/${_class.id}/projects/0`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 404 when the project has not been applied to the class", async () => {
    const _class = await createClass();
    const project = await createProject();
    const response = await server.delete(`/classes/${_class.id}/projects/${project.id}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with id project-class", async () => {
    const _class = await createClass();
    const project = await createProject();
    const projectClass = await assignProjectClass({ classId: _class.id, projectId: project.id })
    const response = await server.delete(`/classes/${_class.id}/projects/${project.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: projectClass.id,
      })
    );
  });
});
