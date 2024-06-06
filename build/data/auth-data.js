"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
const db_1 = require("../db");
async function createUser(email, password, role) {
    return (await (0, db_1.query)("INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *", [email, password, role])).rows[0];
}
exports.createUser = createUser;
async function getUserByEmail(email) {
    return (await (0, db_1.query)("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}
exports.getUserByEmail = getUserByEmail;
