"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const projectsRouter = (0, express_1.Router)();
exports.projectsRouter = projectsRouter;
projectsRouter
    .get("/", controllers_1.projectsController.getAllProjects)
    .get("/:projectId", controllers_1.projectsController.getProject)
    .post("/", (0, middlewares_1.validateSchema)(models_1.projectSchema), controllers_1.projectsController.createProject)
    .patch("/:projectId", (0, middlewares_1.validateSchema)(models_1.projectSchema), controllers_1.projectsController.updateProject)
    .delete("/:projectId", controllers_1.projectsController.deleteProject);
