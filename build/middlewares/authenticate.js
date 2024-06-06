"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("./error");
const jwtSecret = "ultra-secret";
function authenticateHandler(req, _res, next) {
    console.log("Middleware authenticateHandler alcanzado"); // Agrega este registro de consola
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        console.log("Token no encontrado en las cabeceras"); // Agrega este registro de consola
        return next(new error_1.ApiError("No autorizado", 401));
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.userId = payload.userId;
        req.userRole = payload.userRole;
        next();
    }
    catch (error) {
        console.log("Error al verificar el token:", error.message); // Agrega este registro de consola
        return next(new error_1.ApiError("No autorizado", 401));
    }
}
exports.authenticateHandler = authenticateHandler;
