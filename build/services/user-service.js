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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = void 0;
const userDB = __importStar(require("../data/user-data"));
// GET/users:
async function getUsers() {
    return await userDB.getUsers();
}
exports.getUsers = getUsers;
//PATCH/users/{id}:
async function updateUser(id, user) {
    const dataUser = {
        id,
        fieldsToUpdate: user,
    };
    const createUser = await userDB.editUser(dataUser);
    return createUser;
}
exports.updateUser = updateUser;
//DELETE/users/{id}:
async function deleteUser(id) {
    const user = await userDB.deleteUserDb(id);
    console.log(user);
    return user;
}
exports.deleteUser = deleteUser;
