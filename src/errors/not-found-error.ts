import { ApplicationError } from "../protocols.js";

export function notFoundError(entity: string, param: string): ApplicationError {
  return {
    name: "NotFoundError",
    message: `No ${entity} was found with this ${param}`,
  };
}
