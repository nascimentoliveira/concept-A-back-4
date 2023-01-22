import Joi from "joi";
export var studentsSchema = Joi.object({
    name: Joi.string().required(),
    classId: Joi.number().integer().required()
});
