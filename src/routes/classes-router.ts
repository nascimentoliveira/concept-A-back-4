import { Router } from "express";
import { classesSchema } from "../models/classes-model.js";
import { validateSchema } from "../middlewares/schema-middleware.js";
import { createClass } from "../controllers/classes-controller.js";

const classRouter = Router();

classRouter
  .post("/", validateSchema(classesSchema), createClass);

export { classRouter };