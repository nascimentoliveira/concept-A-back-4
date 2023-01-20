import { ApplicationError } from "../protocols.js";

export function duplicatedNameError(entity: string): ApplicationError {
  return {
    name: "DuplicatedNameError",
    message: `A ${entity} with the given name already exists`,
  };
}