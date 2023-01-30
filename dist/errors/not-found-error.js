"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
function notFoundError(message) {
    return {
        name: "NotFoundError",
        message: message,
    };
}
exports.notFoundError = notFoundError;
