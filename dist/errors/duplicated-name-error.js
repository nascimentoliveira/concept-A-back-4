"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicatedNameError = void 0;
function duplicatedNameError(entity) {
    return {
        name: "DuplicatedNameError",
        message: `A ${entity} with the given name already exists`,
    };
}
exports.duplicatedNameError = duplicatedNameError;
