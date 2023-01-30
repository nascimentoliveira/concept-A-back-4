"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const studentsRouter = (0, express_1.Router)();
exports.studentsRouter = studentsRouter;
studentsRouter
    .get("/", controllers_1.studentsController.getAllStudents)
    .get("/:studentId", controllers_1.studentsController.getStudentById)
    .get("/classes/:classId", controllers_1.studentsController.getStudentsByClass)
    .post("/", (0, middlewares_1.validateSchema)(models_1.studentsSchema), controllers_1.studentsController.createStudent)
    .patch("/:studentId", (0, middlewares_1.validateSchema)(models_1.studentsSchema), controllers_1.studentsController.updateStudent)
    .delete("/:studentId", controllers_1.studentsController.deleteStudent);
