import { Request, Response } from "express";
import httpStatus from "http-status";

import { ProjectParams } from "../services/projects-service.js";
import { projectsService } from "../services/projects-service.js";

async function getAllProjects(req: Request, res: Response) {
  try {
    const projects = await projectsService.getAllProjects();
    return res.status(httpStatus.OK).send(projects.rows);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getProject(req: Request, res: Response) {
  const projectId: string = req.params.projectId;

  try {
    const project = await projectsService.getProject(Number(projectId));
    return res.status(httpStatus.OK).send(project.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createProject(req: Request, res: Response) {
  const projectParams = req.body as ProjectParams;

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

async function updateProject(req: Request, res: Response) {
  const projectParams = req.body as ProjectParams;
  const projectId: string = req.params.projectId;

  try {
    const project = await projectsService.updateProject(projectParams, Number(projectId));
    return res.status(httpStatus.OK).send(project.rows[0]);
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

async function deleteProject(req: Request, res: Response) {
  const projectId: string = req.params.projectId;

  try {
    const project = await projectsService.deleteProject(Number(projectId));
    return res.status(httpStatus.OK).send(project.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const projectsController = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
}