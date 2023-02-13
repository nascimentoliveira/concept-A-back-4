import { Request, Response } from "express";
import httpStatus from "http-status";
import { ProjectParams, projectsService } from "@/services";
import { Project } from "@/protocols";

async function getAllProjects(req: Request, res: Response): Promise<Response> {
  try {
    const projects: Project[] = await projectsService.getAllProjects();
    return res.status(httpStatus.OK).send(projects);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: error.message,
    });
  }
}

async function getProject(req: Request, res: Response): Promise<Response> {
  const projectId: number = Number(req.params.projectId);
  try {
    const project: Project = await projectsService.getProject({ id: projectId });
    return res.status(httpStatus.OK).send(project);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({
        message: error.message,
      });
    }
  }
}

async function createProject(req: Request, res: Response): Promise<Response> {
  const projectParams = req.body as ProjectParams;
  try {
    const project: Project = await projectsService.createProject(projectParams);
    return res.status(httpStatus.CREATED).send(project);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send({
        message: error.message,
      });
    }
  }
}

async function updateProject(req: Request, res: Response): Promise<Response> {
  const projectParams = req.body as ProjectParams;
  const projectId: number = Number(req.params.projectId);
  try {
    const project: Project = await projectsService.updateProject(projectParams, { id: projectId });
    return res.status(httpStatus.OK).send(project);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({
        message: error.message,
      });
    }
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send({
        message: error.message,
      });
    }
  }
}

async function deleteProject(req: Request, res: Response): Promise<Response> {
  const projectId: number = Number(req.params.projectId);
  try {
    const project: Project = await projectsService.deleteProject({ id: projectId });
    return res.status(httpStatus.OK).send({ id: project.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({
        message: error.message,
      });
    }
  }
}

export const projectController = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
}
