import express, { Express } from "express";
import cors from "cors";
import { projectsRouter } from "./routes/projects-router.js";
import { classesRouter } from "./routes/classes-router.js";
import { studentsRouter } from "./routes/students-router.js";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use("/projects", projectsRouter)
  .use("/classes", classesRouter)
  .use("/students", studentsRouter);

export function init(): Promise<Express> {
  return Promise.resolve(app);
}

export default app;