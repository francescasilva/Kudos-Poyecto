"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../services/user-service");
const error_1 = require("../middlewares/error");
const user_service_2 = require("../services/user-service");
const authenticate_1 = require("../middlewares/authenticate");
const authorize_1 = require("../middlewares/authorize");
const userRouter = express_1.default.Router();
//GET/users:
userRouter.get("/users", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), async (_req, res, next) => {
    try {
        const users = await (0, user_service_2.getUsers)();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
userRouter.get("/", authenticate_1.authenticateHandler, async (req, res, next) => {
    try {
        // Verificar si el usuario es administrador
        if (req.userRole !== "admin") {
            return next(new error_1.ApiError("Acceso denegado", 403)); // Devolver un error de acceso denegado si no es administrador
        }
        // Si es administrador, obtener la lista de usuarios
        const user = await (0, user_service_2.getUsers)();
        res.json({
            ok: true,
            message: "Lista de usuarios",
            data: user,
        });
    }
    catch (error) {
        next(error); // Pasar cualquier error al middleware de manejo de errores
    }
});
//PATCH/users/{id}
userRouter.patch("/:id", authenticate_1.authenticateHandler, async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const role = req.userRole;
        if (role !== "admin") {
            return res.status(403).json({
                ok: false,
                error: { message: "Acceso denegado" },
            });
        }
        const userUpdated = await (0, user_service_2.updateUser)(Number(id), userData);
        return res.status(200).json({
            ok: true,
            message: "Usuario actualizado exitosamente",
            data: userUpdated,
        });
    }
    catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).json({
            ok: false,
            error: { message: "Error interno del servidor" },
        });
    }
});
//DELETE/users/{id}:
userRouter.delete("/:id", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUsers = await (0, user_service_1.deleteUser)(Number(id));
        res.status(200).json(deleteUsers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: { message: "Error interno del servidor" },
        });
    }
});
exports.default = userRouter;
