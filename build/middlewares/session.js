"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const express_session_1 = __importDefault(require("express-session"));
const db_1 = require("../db");
function sessionHandler() {
    const pgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
    return (0, express_session_1.default)({
        store: new pgSession({ pool: db_1.pool }),
        secret: "session-secret",
        resave: false,
        saveUninitialized: true,
        cookie: { httpOnly: true },
    });
}
exports.default = sessionHandler;
