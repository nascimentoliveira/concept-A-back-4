"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classesRouter = void 0;
const express_1 = require("express");
const models_1 = require("@/models");
const middlewares_1 = require("@/middlewares");
const controllers_1 = require("@/controllers");
const classesRouter = (0, express_1.Router)();
exports.classesRouter = classesRouter;
classesRouter
    .get("/", controllers_1.classController.getAllClasses)
    .get("/:classId", controllers_1.classController.getClass)
    .get("/:classId/projects/", controllers_1.classController.listProjectsByClass)
    .get("/:classId/students/", controllers_1.classController.listStudentsByClass)
    .post("/", (0, middlewares_1.validateSchema)(models_1.classesSchema), controllers_1.classController.createClass)
    .post("/:classId/projects/:projectId", controllers_1.classController.applyProject)
    .patch("/:classId", (0, middlewares_1.validateSchema)(models_1.classesSchema), controllers_1.classController.updateClass)
    .delete("/:classId", controllers_1.classController.deleteClass)
    .delete("/:classId/projects/:projectId", controllers_1.classController.removeProject);
