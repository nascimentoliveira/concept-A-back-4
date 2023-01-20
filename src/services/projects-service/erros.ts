import { ApplicationError } from "../../protocols.js";

export function duplicatedNameError(): ApplicationError {
  return {
    name: "DuplicatedNameError",
    message: "A project with the given name already exists",
  };
}