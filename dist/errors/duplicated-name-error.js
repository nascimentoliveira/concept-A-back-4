export function duplicatedNameError(entity) {
    return {
        name: "DuplicatedNameError",
        message: "A ".concat(entity, " with the given name already exists")
    };
}
