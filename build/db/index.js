"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const dbConfig = {
    host: process.env["PGHOST"], //Tu host
    port: Number(process.env["PGPORT"]),
    database: process.env["PGDATABASE"],
    user: process.env["PGUSER"], //Tu usuario
    password: process.env["PGPASSWORD"], //Contraseña
};
// const dbConfig = {
//   user: "postgres",
//     host: "localhost",
//     password: "THIAGOSILVA",
//     database: "restoraters", // extended
//     port: 5432
// };
exports.pool = new Pool(dbConfig);
// Manejar cierre de la aplicación
const gracefulShutdown = () => {
    exports.pool.end(() => {
        console.log("\nApplication ended gracefully");
        process.exit(0);
    });
};
// Eventos de cierre para que no se queden conexiones abiertas
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
const query = (text, params) => {
    return exports.pool.query(text, params);
};
exports.query = query;
