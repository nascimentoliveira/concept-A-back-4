import { Request, Response } from "express";
import httpStatus from "http-status";
import { ClassParams, classesService } from "@/services";
import { Class, ClassWithProjectsListReturn, ClassWithStudentsListReturn, ProjectClass } from "@/protocols";

async function getAllClasses(req: Request, res: Response): Promise<Response> {
  try {
    const classes: Class[] = await classesService.getAllClasses();
    return res.status(httpStatus.OK).send(classes);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getClass(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  try {
    const _class: Class = await classesService.getClass({ id: classId });
    return res.status(httpStatus.OK).send(_class);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createClass(req: Request, res: Response): Promise<Response> {
  const classParams = req.body as ClassParams;
  try {
    const _class: Class = await classesService.createClass(classParams);
    return res.status(httpStatus.CREATED).send(_class);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function updateClass(req: Request, res: Response): Promise<Response> {
  const classParams = req.body as ClassParams;
  const classId: number = Number(req.params.classId);
  try {
    const _class: Class = await classesService.updateClass(classParams, { id: classId });
    return res.status(httpStatus.OK).send(_class);
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

async function deleteClass(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  try {
    const _class: Class = await classesService.deleteClass({ id: classId });
    return res.status(httpStatus.OK).send({ id: _class.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function listProjectsByClass(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  try {
    const projects: ClassWithProjectsListReturn = await classesService.listProjectsByClass({
      id: classId
    });
    return res.status(httpStatus.OK).send(projects);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function listStudentsByClass(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  try {
    const students: ClassWithStudentsListReturn = await classesService.listStudentsByClass({
      id: classId
    });
    return res.status(httpStatus.OK).send(students);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function applyProject(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  const projectId: number = Number(req.params.projectId);
  const { deadline } = req.body;
  try {
    const projectClass: ProjectClass = await classesService.applyProject({
      classId: classId, projectId: projectId, deadline: deadline
    });
    return res.status(httpStatus.CREATED).send(projectClass);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function removeProject(req: Request, res: Response): Promise<Response> {
  const classId: number = Number(req.params.classId);
  const projectId: number = Number(req.params.projectId);
  try {
    const projectClass: ProjectClass = await classesService.removeProject({
      classId: classId, projectId: projectId
    });
    return res.status(httpStatus.OK).send({ id: projectClass.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "ConflictError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const classController = {
  getAllClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  listProjectsByClass,
  listStudentsByClass,
  applyProject,
  removeProject,
}
