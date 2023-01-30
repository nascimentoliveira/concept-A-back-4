import Joi from "joi";

export const classesSchema = Joi.object({
  name: Joi.string().required()
});
