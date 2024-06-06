"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserDb = exports.editUser = exports.getUsers = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
// GET/user:
async function getUsers() {
    return (await (0, db_1.query)("SELECT * FROM users")).rows;
}
exports.getUsers = getUsers;
//PATCH/user/{id}
async function editUser({ id, fieldsToUpdate, }) {
    if (!id || Object.keys(fieldsToUpdate).length === 0) {
        throw new Error("No se proporcionaron datos para actualizar");
    }
    // Verificar si se está actualizando la contraseña
    if (fieldsToUpdate["password"]) {
        // Encriptar la nueva contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt_1.default.hash(fieldsToUpdate["password"], 10);
        fieldsToUpdate["password"] = hashedPassword; // Reemplazar la contraseña sin encriptar por la encriptada
    }
    const entries = Object.entries(fieldsToUpdate);
    const setClauses = entries.map(([key, _], index) => `${key} = $${index + 1}`);
    const updateQuery = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${entries.length + 1} RETURNING *`;
    const params = [...entries.map(([, value]) => value), id];
    const result = await (0, db_1.query)(updateQuery, params);
    return result.rows[0]; // Devuelve el usuario actualizado
}
exports.editUser = editUser;
// DELETE/users/{id}:
async function deleteUserDb(id) {
    const result = await (0, db_1.query)("DELETE FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
        return { ok: false, message: "El user no existe" };
    }
    return { ok: true, message: "Usuario eliminado exitosamente" };
}
exports.deleteUserDb = deleteUserDb;
