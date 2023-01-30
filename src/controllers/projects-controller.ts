import { Request, Response } from "express";
import httpStatus from "http-status";
import { QueryResult } from "pg";
import { ProjectParams, projectsService } from "@/services";

async function getAllProjects(req: Request, res: Response): Promise<Response> {
  try {
    const projects: QueryResult = await projectsService.getAllProjects();
    return res.status(httpStatus.OK).send(projects.rows);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getProject(req: Request, res: Response): Promise<Response> {
  const projectId: string = req.params.projectId;

  try {
    const project: QueryResult = await projectsService.getProject(Number(projectId));
    return res.status(httpStatus.OK).send(project.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createProject(req: Request, res: Response): Promise<Response> {
  const projectParams = req.body as ProjectParams;

  try {
    const project: QueryResult = await projectsService.createProject(projectParams);
    return res.status(httpStatus.CREATED).send(project.rows[0]);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function updateProject(req: Request, res: Response): Promise<Response> {
  const projectParams = req.body as ProjectParams;
  const projectId: string = req.params.projectId;

  try {
    const project: QueryResult = await projectsService.updateProject(projectParams, Number(projectId));
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

async function deleteProject(req: Request, res: Response): Promise<Response> {
  const projectId: string = req.params.projectId;

  try {
    const project: QueryResult = await projectsService.deleteProject(Number(projectId));
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
  deleteProject,
}
