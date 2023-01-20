import { Router } from "express";
import { projectSchema } from "../models/projects-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { createProject, updateProject } from "../controllers/projects-controller.js";

const projectsRouter = Router();

projectsRouter
  .post("/", validateSchema(projectSchema), createProject)
  .patch("/", validateSchema(projectSchema), updateProject);

export { projectsRouter };