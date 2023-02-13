import app, { close, init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createProject } from "../factories";
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

describe("POST /projects", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/projects");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.post("/projects").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: `Project ${faker.commerce.productName()}`.slice(0, 30),
    });

    it("should respond with status 409 when there is already a project with the same name", async () => {
      const body = generateValidBody();
      await createProject(body);
      const response = await server.post("/projects").send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 201 with project data", async () => {
      const body = generateValidBody();
      const response = await server.post("/projects").send(body);
      const project = await prisma.project.findUnique({
        where: { name: body.name },
      });
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: project.id,
          name: project.name,
          createdAt: project.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("GET /projects", () => {

  it("should respond with status 200 and empty data array when it has no registered project", async () => {
    const response = await server.get("/projects");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([]))
  });

  it("should respond with status 200 with projects data", async () => {
    const project = await createProject();
    const response = await server.get("/projects");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: project.id,
        name: project.name,
        createdAt: project.createdAt.toISOString(),
      })
    ]));
  });
});

describe("GET /projects/:projectId", () => {
  it("should respond with status 404 when projectId is non-existent", async () => {
    const response = await server.get("/projects/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with project data", async () => {
    const project = await createProject();
    const response = await server.get(`/projects/${project.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: project.id,
        name: project.name,
        createdAt: project.createdAt.toISOString(),
      })
    );
  });
});

describe("PATCH /projects/:projectId", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.patch("/projects/0");
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    const response = await server.patch("/projects/0").send(invalidBody);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      name: `Project ${faker.commerce.productName()}`.slice(0, 30),
    });

    it("should respond with status 404 when projectId is non-existent", async () => {
      const body = generateValidBody();
      const response = await server.patch("/projects/0").send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 409 when there is already a project with the same name", async () => {
      const body1 = generateValidBody();
      await createProject(body1);
      const body2 = generateValidBody();
      const project = await createProject(body2);
      const response = await server.patch(`/projects/${project.id}`).send(body1);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with status 200 with project data", async () => {
      const body = generateValidBody();
      const project = await createProject();
      const response = await server.patch(`/projects/${project.id}`).send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: project.id,
          name: body.name,
          createdAt: project.createdAt.toISOString(),
        })
      );
    });
  });
});

describe("DELETE /projects/:projectId", () => {
  it("should respond with status 404 when projectId is non-existent", async () => {
    const response = await server.delete("/projects/0");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 with id project", async () => {
    const project = await createProject();
    const response = await server.delete(`/projects/${project.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: project.id,
      })
    );
  });
});
