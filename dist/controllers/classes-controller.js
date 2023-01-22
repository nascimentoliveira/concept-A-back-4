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
import httpStatus from "http-status";
import { classesService } from "../services/classes-service.js";
function getAllClasses(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, classesService.getAllClasses()];
                case 1:
                    classes = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(classes.rows)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, class_, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.getClass(Number(classId))];
                case 2:
                    class_ = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(class_.rows[0])];
                case 3:
                    error_2 = _a.sent();
                    if (error_2.name === "NotFoundError") {
                        return [2 /*return*/, res.status(httpStatus.NOT_FOUND).send(error_2)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listProjectsByClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, projects, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.listProjectsByClass(Number(classId))];
                case 2:
                    projects = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(projects.rows[0])];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.name === "NotFoundError") {
                        return [2 /*return*/, res.status(httpStatus.NOT_FOUND).send(error_3)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listStudentsByClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, students, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.listStudentsByClass(Number(classId))];
                case 2:
                    students = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(students.rows[0])];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    if (error_4.name === "NotFoundError") {
                        return [2 /*return*/, res.status(httpStatus.NOT_FOUND).send(error_4)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_4)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classParams, project, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classParams = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.createClass(classParams)];
                case 2:
                    project = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.CREATED).send(project.rows[0])];
                case 3:
                    error_5 = _a.sent();
                    if (error_5.name === "DuplicatedNameError") {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send(error_5)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_5)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function applyProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, projectId, projectsClasses, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    projectId = req.params.projectId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.applyProject(Number(classId), Number(projectId))];
                case 2:
                    projectsClasses = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.CREATED).send(projectsClasses.rows[0])];
                case 3:
                    error_6 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_6)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classParams, classId, class_, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classParams = req.body;
                    classId = req.params.classId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.updateClass(classParams, Number(classId))];
                case 2:
                    class_ = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(class_.rows[0])];
                case 3:
                    error_7 = _a.sent();
                    if (error_7.name === "NotFoundError") {
                        return [2 /*return*/, res.status(httpStatus.NOT_FOUND).send(error_7)];
                    }
                    if (error_7.name === "DuplicatedNameError") {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send(error_7)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_7)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteClass(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, project, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.deleteClass(Number(classId))];
                case 2:
                    project = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(project.rows[0])];
                case 3:
                    error_8 = _a.sent();
                    if (error_8.name === "NotFoundError") {
                        return [2 /*return*/, res.status(httpStatus.NOT_FOUND).send(error_8)];
                    }
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_8)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removeProject(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var classId, projectId, projectsClasses, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classId = req.params.classId;
                    projectId = req.params.projectId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, classesService.removeProject(Number(classId), Number(projectId))];
                case 2:
                    projectsClasses = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(projectsClasses.rows[0])];
                case 3:
                    error_9 = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send(error_9)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export var classController = {
    getAllClasses: getAllClasses,
    getClass: getClass,
    listProjectsByClass: listProjectsByClass,
    listStudentsByClass: listStudentsByClass,
    createClass: createClass,
    applyProject: applyProject,
    updateClass: updateClass,
    deleteClass: deleteClass,
    removeProject: removeProject
};
