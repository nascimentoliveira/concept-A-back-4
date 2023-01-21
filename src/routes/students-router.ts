import { Router } from "express";
import { studentsSchema } from "../models/students-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { studentsController } from "../controllers/students-controller.js";

const studentsRouter = Router();

studentsRouter
  .get("/", studentsController.getAllStudents)
  .get("/:studentId", studentsController.getStudentById)
  .get("/classes/:classId", studentsController.getStudentsByClass)
  .post("/", validateSchema(studentsSchema), studentsController.createStudent)
  .patch("/:studentId", validateSchema(studentsSchema), studentsController.updateStudent)
  .delete("/:studentId", studentsController.deleteStudent);

export { studentsRouter }; 