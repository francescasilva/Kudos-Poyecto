"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = void 0;
const zod_1 = require("zod");
const error_1 = require("./error");
function validationHandler(schema) {
    return async (req, _res, next) => {
        try {
            const body = schema.parse(req.body);
            req.body = body;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                console.log(error);
                next(new error_1.ApiError("Error de validación", 400, formatIssues(error.issues)));
            }
            else {
                next(error);
            }
        }
    };
}
exports.validationHandler = validationHandler;
function formatIssues(issues) {
    const formattedIssues = {};
    issues.forEach((issue) => {
        formattedIssues[issue.path.join(".")] = issue.message;
    });
    return formattedIssues;
}
