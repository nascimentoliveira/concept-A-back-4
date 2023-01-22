import { Router } from "express";
import { classesSchema } from "../models/classes-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { classController } from "../controllers/classes-controller.js";
var classesRouter = Router();
classesRouter
    .get("/", classController.getAllClasses)
    .get("/:classId", classController.getClass)
    .get("/:classId/projects/", classController.listProjectsByClass)
    .get("/:classId/students/", classController.listStudentsByClass)
    .post("/", validateSchema(classesSchema), classController.createClass)
    .post("/:classId/projects/:projectId", classController.applyProject)
    .patch("/:classId", validateSchema(classesSchema), classController.updateClass)["delete"]("/:classId", classController.deleteClass)["delete"]("/:classId/projects/:projectId", classController.removeProject);
export { classesRouter };
