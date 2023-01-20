import { Request, Response } from "express";
import httpStatus from "http-status";

import { CreateProjectParams, UpdateProjectParams } from "../services/projects-service/projects-service.js";
import projectsService from "../services/projects-service/projects-service.js";

export async function createProject(req: Request, res: Response) {

  const projectParams = req.body as CreateProjectParams;

  try {
    const project = await projectsService.createProject(projectParams);
    return res.status(httpStatus.CREATED).send(project.rows[0]);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function updateProject(req: Request, res: Response) {

  const projectParams = req.body as UpdateProjectParams;

  try {
    const project = await projectsService.updateProject(projectParams);
    return res.status(httpStatus.CREATED).send(project.rows[0]);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}