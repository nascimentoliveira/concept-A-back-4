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

async function getStudentById(req: Request, res: Response) {
  const studentId: string = req.params.studentId;

  try {
    const student = await studentsService.getStudentById(Number(studentId));
    return res.status(httpStatus.OK).send(student.rows[0]);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getStudentsByClass(req: Request, res: Response) {
  const classId: string = req.params.class;

  try {
    const students = await studentsService.getStudentsByClass(Number(classId));
    return res.status(httpStatus.OK).send(students.rows[0]);
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
  const studentId: string = req.params.studentId;

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
  const studentId: string = req.params.studentId;

  try {
    const student = await studentsService.deleteStudent(Number(studentId));
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
  getStudentById,
  getStudentsByClass,
  createStudent,
  updateStudent,
  deleteStudent
}