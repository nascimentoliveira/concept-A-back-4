import { Router } from "express";
import { classesSchema } from "../models/classes-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { classController } from "../controllers/classes-controller.js";

const classesRouter = Router();

classesRouter
  .get("/", classController.getAllClasses)
  .get("/:id", classController.getClass)
  .post("/", validateSchema(classesSchema), classController.createClass)
  .patch("/:id", validateSchema(classesSchema), classController.updateClass)
  .delete("/:id", classController.deleteClass);

export { classesRouter }; 