import { Router } from "express";
import { studentsSchema } from "@/models";
import { validateSchema } from "@/middlewares";
import { classController, studentController } from "@/controllers";

const studentsRouter = Router();

studentsRouter
  .get("/", studentController.getAllStudents)
  .get("/:studentId", studentController.getStudentById)
  .get("/classes/:classId", classController.listStudentsByClass)
  .post("/", validateSchema(studentsSchema), studentController.createStudent)
  .patch("/:studentId", validateSchema(studentsSchema), studentController.updateStudent)
  .delete("/:studentId", studentController.deleteStudent);

export { studentsRouter };
