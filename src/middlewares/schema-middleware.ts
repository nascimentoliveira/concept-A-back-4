import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";

export function validateSchema(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors: errors });
      return;
    }
    next();
  };
}