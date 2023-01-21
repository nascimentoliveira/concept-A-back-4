import { Request, Response } from "express";
import httpStatus from "http-status";

import { StudentParams } from "../services/students-service.js";
import { studentsService } from "../services/students-service.js";

async function getAllStudents(req: Request, res: Response) {

  try {
    const students = await studentsService.getAllStudents();
    return res.status(httpStatus.OK).send(students.rows);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getStudent(req: Request, res: Response) {

  const studentId: string = req.params.id;

  try {
    const student = await studentsService.getStudent(Number(studentId));
    return res.status(httpStatus.OK).send(student.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createStudent(req: Request, res: Response) {

  const projectParams = req.body as StudentParams;

  try {
    const student = await studentsService.createStudent(projectParams);
    return res.status(httpStatus.CREATED).send(student.rows[0]);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function updateStudent(req: Request, res: Response) {

  const studentParams = req.body as StudentParams;
  const studentId: string = req.params.id;

  try {
    const student = await studentsService.updateStudent(studentParams, Number(studentId));
    return res.status(httpStatus.OK).send(student.rows[0]);
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

async function deleteStudent(req: Request, res: Response) {

  const projectId: string = req.params.id;

  try {
    const student = await studentsService.deleteStudent(Number(projectId));
    return res.status(httpStatus.OK).send(student.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const studentsController = {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
}