import Joi from "joi";
export var projectSchema = Joi.object({
    name: Joi.string().required()
});
