import { Router } from "express";
import { classesSchema, projectClassSchema } from "@/models";
import { validateSchema } from "@/middlewares";
import { classController } from "@/controllers";

const classesRouter = Router();

classesRouter
  .get("/", classController.getAllClasses)
  .get("/:classId", classController.getClass)
  .get("/:classId/projects/", classController.listProjectsByClass)
  .get("/:classId/students/", classController.listStudentsByClass)
  .post("/", validateSchema(classesSchema), classController.createClass)
  .post("/:classId/projects/:projectId", validateSchema(projectClassSchema), classController.applyProject)
  .patch("/:classId", validateSchema(classesSchema), classController.updateClass)
  .delete("/:classId", classController.deleteClass)
  .delete("/:classId/projects/:projectId", classController.removeProject);

export { classesRouter }; 
