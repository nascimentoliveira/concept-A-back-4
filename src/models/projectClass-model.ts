import Joi from "joi";

export const projectClassSchema = Joi.object({
  deadline: Joi.date().iso().required(),
});
