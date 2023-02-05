import { Router } from "express";
import { projectSchema } from "@/models";
import { validateSchema } from "@/middlewares";
import { projectController } from "@/controllers";

const projectsRouter = Router();

projectsRouter
  .get("/", projectController.getAllProjects)
  .get("/:projectId", projectController.getProject)
  .post("/", validateSchema(projectSchema), projectController.createProject)
  .patch("/:projectId", validateSchema(projectSchema), projectController.updateProject)
  .delete("/:projectId", projectController.deleteProject);

export { projectsRouter };
