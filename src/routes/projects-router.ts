import { Router } from "express";
import { projectSchema } from "../models/projects-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { createProject } from "../controllers/projects-controller.js";

const projectsRouter = Router();

projectsRouter
  .post("/", validateSchema(projectSchema), createProject);

export { projectsRouter };