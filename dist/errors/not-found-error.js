export function notFoundError(entity, param) {
    return {
        name: "NotFoundError",
        message: "No ".concat(entity, " was found with this ").concat(param)
    };
}
