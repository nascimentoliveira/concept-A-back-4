import { Request, Response } from "express";
import httpStatus from "http-status";

import { ClassParams } from "../services/classes-service.js";
import { classesService } from "../services/classes-service.js";

async function getAllClasses(req: Request, res: Response) {
  try {
    const classes = await classesService.getAllClasses();
    return res.status(httpStatus.OK).send(classes.rows);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getClass(req: Request, res: Response) {
  const classId: string = req.params.classId;

  try {
    const class_ = await classesService.getClass(Number(classId));
    return res.status(httpStatus.OK).send(class_.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function listProjectsByClass(req: Request, res: Response) {
  const classId: string = req.params.classId;

  try {
    const projects = await classesService.listProjectsByClass(Number(classId));
    return res.status(httpStatus.OK).send(projects.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function listStudentsByClass(req: Request, res: Response) {
  const classId: string = req.params.classId;

  try {
    const students = await classesService.listStudentsByClass(Number(classId));
    return res.status(httpStatus.OK).send(students.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createClass(req: Request, res: Response) {
  const classParams = req.body as ClassParams;

  try {
    const project = await classesService.createClass(classParams);
    return res.status(httpStatus.CREATED).send(project.rows[0]);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function applyProject(req: Request, res: Response) {
  const classId: string = req.params.classId;
  const projectId: string = req.params.projectId;

  try {
    const projectsClasses = await classesService.applyProject(Number(classId), Number(projectId));
    return res.status(httpStatus.CREATED).send(projectsClasses.rows[0]);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function updateClass(req: Request, res: Response) {
  const classParams = req.body as ClassParams;
  const classId: string = req.params.classId;

  try {
    const class_ = await classesService.updateClass(classParams, Number(classId));
    return res.status(httpStatus.OK).send(class_.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function deleteClass(req: Request, res: Response) {
  const classId: string = req.params.classId;

  try {
    const project = await classesService.deleteClass(Number(classId));
    return res.status(httpStatus.OK).send(project.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function removeProject(req: Request, res: Response) {
  const classId: string = req.params.classId;
  const projectId: string = req.params.projectId;

  try {
    const projectsClasses = await classesService.removeProject(Number(classId), Number(projectId));
    return res.status(httpStatus.OK).send(projectsClasses.rows[0]);
  } catch (error) {

    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const classController = {
  getAllClasses,
  getClass,
  listProjectsByClass,
  listStudentsByClass,
  createClass,
  applyProject,
  updateClass,
  deleteClass,
  removeProject
}