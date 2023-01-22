import express from "express";
import cors from "cors";
import { projectsRouter } from "./routes/projects-router.js";
import { classesRouter } from "./routes/classes-router.js";
import { studentsRouter } from "./routes/students-router.js";
var app = express();
app
    .use(cors())
    .use(express.json())
    .get("/health", function (req, res) { return res.send("OK!"); })
    .use("/projects", projectsRouter)
    .use("/classes", classesRouter)
    .use("/students", studentsRouter);
export function init() {
    return Promise.resolve(app);
}
export default app;
