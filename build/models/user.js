"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: "Username es requerido",
        invalid_type_error: "Username debe ser un string",
    })
        .optional(),
    password: zod_1.z
        .string({
        required_error: "Password es requerido",
        invalid_type_error: "Password debe ser un string",
    })
        .min(6, "Password debe tener al menos 6 caracteres")
        .optional(),
    role: zod_1.z
        .enum(["admin", "user"], {
        errorMap: () => ({ message: "El rol debe ser admin o user" }),
    })
        .default("user")
        .optional(),
});
