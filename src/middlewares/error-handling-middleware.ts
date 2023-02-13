import { ApplicationError } from "@/protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(error: ApplicationError | Error, _req: Request, res: Response) {
  /* eslint-disable-next-line no-console */
  console.error(error.name);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
