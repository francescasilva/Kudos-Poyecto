"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDB = __importStar(require("../data/auth-data"));
const error_1 = require("../middlewares/error");
async function createUser(data) {
    const { email, password, role } = data;
    const user = await userDB.getUserByEmail(email);
    if (user) {
        throw new error_1.ApiError("El email ya está registrado", 400);
    }
    const costFactor = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, costFactor);
    const newUser = await userDB.createUser(email, hashedPassword, role);
    return newUser;
}
exports.createUser = createUser;
async function validateCredentials(credentials) {
    const { email, password } = credentials;
    const user = await userDB.getUserByEmail(email);
    const isValid = await bcrypt_1.default.compare(password, user?.password || "");
    if (!user || !isValid) {
        throw new error_1.ApiError("Credenciales incorrectas", 400);
    }
    return user;
}
exports.validateCredentials = validateCredentials;
