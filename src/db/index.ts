import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const dbConfig = {
  host: process.env["PGHOST"],//Tu host
  port:  Number(process.env["PGPORT"]),
  database: process.env["PGDATABASE"],
  user: process.env["PGUSER"],//Tu usuario
  password: process.env["PGPASSWORD"], //Contraseña
};

// const dbConfig = {
//   user: "postgres",
//     host: "localhost",
//     password: "THIAGOSILVA",
//     database: "restoraters", // extended
//     port: 5432
// };

export const pool = new Pool(dbConfig);
// Manejar cierre de la aplicación
const gracefulShutdown = () => {
  pool.end(() => {
    console.log("\nApplication ended gracefully");
    process.exit(0);
  });
};

// Eventos de cierre para que no se queden conexiones abiertas
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
