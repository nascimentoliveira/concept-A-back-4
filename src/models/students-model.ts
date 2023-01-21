import Joi from "joi";

export const studentsSchema = Joi.object({
  name: Joi.string().required(),
  classId: Joi.number().integer().required()
});