import { Router } from "express";
import { projectSchema } from "../models/projects-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { projectsController } from "../controllers/projects-controller.js";

const projectsRouter = Router();

projectsRouter
  .get("/", projectsController.getAllProjects)
  .get("/:projectId", projectsController.getProject)
  .post("/", validateSchema(projectSchema), projectsController.createProject)
  .patch("/:projectId", validateSchema(projectSchema), projectsController.updateProject)
  .delete("/:projectId", projectsController.deleteProject);

export { projectsRouter };