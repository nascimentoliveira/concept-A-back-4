import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import { invalidDataError } from "../errors/invalid-data-error.js";

export function validateSchema(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
      return;
    }
    next();
  };
}