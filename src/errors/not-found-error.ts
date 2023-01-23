import { ApplicationError } from "../protocols.js";

export function notFoundError(message: string): ApplicationError {
  return {
    name: "NotFoundError",
    message: message,
  };
}
