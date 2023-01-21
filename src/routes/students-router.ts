import { Router } from "express";
import { studentsSchema } from "../models/students-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { studentsController } from "../controllers/students-controller.js";

const studentsRouter = Router();

studentsRouter
  .get("/", studentsController.getAllStudents)
  .get("/:id", studentsController.getStudent)
  .post("/", validateSchema(studentsSchema), studentsController.createStudent)
  .patch("/:id", validateSchema(studentsSchema), studentsController.updateStudent)
  .delete("/:id", studentsController.deleteStudent);

export { studentsRouter }; 