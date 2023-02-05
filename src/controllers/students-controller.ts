import { Request, Response } from "express";
import httpStatus from "http-status";
import { StudentParams, studentsService } from "@/services";
import { Student } from "@/protocols";

async function getAllStudents(req: Request, res: Response): Promise<Response> {
  try {
    const students: Student[] = await studentsService.getAllStudents();
    return res.status(httpStatus.OK).send(students);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getStudentById(req: Request, res: Response): Promise<Response> {
  const studentId: number = Number(req.params.studentId);
  try {
    const student: Student = await studentsService.getStudentById({ id: studentId });
    return res.status(httpStatus.OK).send(student);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function createStudent(req: Request, res: Response): Promise<Response> {
  const studentsParams = req.body as StudentParams;
  try {
    const student: Student = await studentsService.createStudent(studentsParams);
    return res.status(httpStatus.CREATED).send(student);
  } catch (error) {
    if (error.name === "DuplicatedNameError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function updateStudent(req: Request, res: Response): Promise<Response> {
  const studentParams = req.body as StudentParams;
  const studentId: number = Number(req.params.studentId);
  try {
    const student: Student = await studentsService.updateStudent(studentParams, { id: studentId });
    return res.status(httpStatus.OK).send(student);
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

async function deleteStudent(req: Request, res: Response): Promise<Response> {
  const studentId: number = Number(req.params.studentId);
  try {
    const student: Student = await studentsService.deleteStudent({ id: studentId });
    return res.status(httpStatus.OK).send({ id: student.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export const studentController = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
}
