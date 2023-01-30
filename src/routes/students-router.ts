import { Router } from "express";
import { studentsSchema } from "@/models";
import { validateSchema } from "@/middlewares";
import { studentsController } from "@/controllers";

const studentsRouter = Router();

studentsRouter
  .get("/", studentsController.getAllStudents)
  .get("/:studentId", studentsController.getStudentById)
  .get("/classes/:classId", studentsController.getStudentsByClass)
  .post("/", validateSchema(studentsSchema), studentsController.createStudent)
  .patch("/:studentId", validateSchema(studentsSchema), studentsController.updateStudent)
  .delete("/:studentId", studentsController.deleteStudent);

export { studentsRouter };
