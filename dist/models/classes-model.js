import Joi from "joi";
export var classesSchema = Joi.object({
    name: Joi.string().required()
});
