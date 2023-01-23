var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { duplicatedNameError } from "../errors/duplicated-name-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import { studentsRepository } from "../repositories/students-repository.js";
import { classesRepository } from "../repositories/classes-repository.js";
export function getAllStudents() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, studentsRepository.getAll()];
        });
    });
}
export function getStudentById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateStudentIdExistsOrFail(id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, studentsRepository.findById(id)];
            }
        });
    });
}
export function getStudentsByClass(classId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateClassIdExistsOrFail(classId)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, studentsRepository.listStudentsByClass(classId)];
            }
        });
    });
}
export function createStudent(student) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateUniqueNameOrFail(student.name)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, validateClassIdExistsOrFail(student.classId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, studentsRepository.create(student.name, student.classId)];
            }
        });
    });
}
export function updateStudent(student, studentId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateStudentIdExistsOrFail(studentId)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, validateClassIdExistsOrFail(student.classId)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, validateUniqueNameOrFail(student.name, studentId)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, studentsRepository.update(studentId, student.name, student.classId)];
            }
        });
    });
}
export function deleteStudent(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateStudentIdExistsOrFail(id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, studentsRepository.deleteStudent(id)];
            }
        });
    });
}
function validateUniqueNameOrFail(name, studentId) {
    return __awaiter(this, void 0, void 0, function () {
        var studentWithSameName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, studentsRepository.findByName(name)];
                case 1:
                    studentWithSameName = _a.sent();
                    if (studentId) {
                        if (studentWithSameName.rowCount && studentId !== studentWithSameName.rows[0].id) {
                            throw duplicatedNameError("student");
                        }
                    }
                    else {
                        if (studentWithSameName.rowCount) {
                            throw duplicatedNameError("student");
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function validateStudentIdExistsOrFail(id) {
    return __awaiter(this, void 0, void 0, function () {
        var studentExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, studentsRepository.findById(id)];
                case 1:
                    studentExists = _a.sent();
                    if (!studentExists.rowCount) {
                        throw notFoundError("No student was found with this id");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function validateClassIdExistsOrFail(id) {
    return __awaiter(this, void 0, void 0, function () {
        var classExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, classesRepository.findById(id)];
                case 1:
                    classExists = _a.sent();
                    if (!classExists.rowCount) {
                        throw notFoundError("No class was found with this id");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export var studentsService = {
    getAllStudents: getAllStudents,
    getStudentById: getStudentById,
    getStudentsByClass: getStudentsByClass,
    createStudent: createStudent,
    updateStudent: updateStudent,
    deleteStudent: deleteStudent
};
