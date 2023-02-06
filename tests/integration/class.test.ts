import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
});

/* beforeEach(async () => {
  await cleanDb();
}); */

const server = supertest(app);

describe("GET /classes", () => {
  it("should respond with status 200 and with hotels data", async () => {
    const response = await server.get("/classes");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          numberOfProjects: expect.any(Number),
          numberOfStudents: expect.any(Number),
          createdAt: expect.any(String),
        })
      ])
    )
  });
});

describe("GET /classes/:classId", () => {
  it("should respond with status 404 when hotelId is non-existent", async () => {
    const response = await server.get("/classes/100");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 and with hotels data", async () => {
    const response = await server.get("/classes/6");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        numberOfProjects: expect.any(Number),
        numberOfStudents: expect.any(Number),
        createdAt: expect.any(String),
      })
    );
  });
});
