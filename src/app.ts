import express, { Express } from "express";
import cors from "cors";
import { projectsRouter, classesRouter, studentsRouter } from "@/routes";
import { connectDb, disconnectDB } from "@/config";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use("/projects", projectsRouter)
  .use("/classes", classesRouter)
  .use("/students", studentsRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;