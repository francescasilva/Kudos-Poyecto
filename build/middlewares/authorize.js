"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const error_1 = require("./error");
function authorize(...allowedRoles) {
    return async (req, _res, next) => {
        const role = req.userRole;
        if (!role)
            return next(new error_1.ApiError("No autorizado", 401));
        if (allowedRoles.includes(role)) {
            next();
        }
        else {
            next(new error_1.ApiError("Acceso denegado", 403));
        }
    };
}
exports.authorize = authorize;
