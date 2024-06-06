"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const auth_1 = require("../models/auth");
const auth_service_1 = require("../services/auth-service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "ultra-secret";
const authRouter = express_1.default.Router();
//POST/register:
authRouter.post("/register", (0, validation_1.validationHandler)(auth_1.userSchema), async (req, res, next) => {
    try {
        const newUser = await (0, auth_service_1.createUser)(req.body);
        res.status(201).json({
            ok: true,
            message: "Usuario registrado exitosamente",
            data: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
//POST/Login:
authRouter.post("/login", async (req, res, next) => {
    try {
        const user = await (0, auth_service_1.validateCredentials)(req.body);
        // console.log(req.session);
        const payload = { userId: user.id, userRole: user.role };
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: "60m" });
        res.json({
            ok: true,
            message: "Login exitoso",
            data: { token: token },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = authRouter;
