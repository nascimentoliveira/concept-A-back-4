import { ApplicationError } from "../protocols.js";

export function duplicatedNameError(): ApplicationError {
  return {
    name: "DuplicatedNameError",
    message: "There is already an project with given name",
  };
}