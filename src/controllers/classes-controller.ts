import { Request, Response } from "express";
import httpStatus from "http-status";

import { CreateProjectParams } from "../services/projects-service/projects-service.js";
import classesService from "../services/classes-service/classes-service.js";

export async function createClass(req: Request, res: Response) {

  const classParams = req.body as CreateProjectParams;

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