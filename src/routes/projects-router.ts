import { Router } from "express";
import { projectSchema } from "@/models";
import { validateSchema } from "@/middlewares";
import { projectsController } from "@/controllers";

const projectsRouter = Router();

projectsRouter
  .get("/", projectsController.getAllProjects)
  .get("/:projectId", projectsController.getProject)
  .post("/", validateSchema(projectSchema), projectsController.createProject)
  .patch("/:projectId", validateSchema(projectSchema), projectsController.updateProject)
  .delete("/:projectId", projectsController.deleteProject);

export { projectsRouter };
