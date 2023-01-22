import httpStatus from "http-status";
import { invalidDataError } from "../errors/invalid-data-error.js";
export function validateSchema(schema) {
    return function (req, res, next) {
        var error = schema.validate(req.body, { abortEarly: false }).error;
        if (error) {
            res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map(function (d) { return d.message; })));
            return;
        }
        next();
    };
}
