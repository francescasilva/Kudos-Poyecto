import express from "express";
import sessionHandler from "./middlewares/session";
import authRouter from "./routers/auth-router";
import userRouter from "./routers/user-router";
import uploadRouter from "./controlador/upload";
import errorHandler from "./middlewares/error";
import { authenticateHandler } from "./middlewares/authenticate";
import { authorize } from "./middlewares/authorize";
import cors from "cors";

const app = express();
const port =  process.env["PORT"] || 5500;



// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: process.env["CLIENT_ORIGIN"], // http:localhost:5173
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());
app.use(sessionHandler());

// ROUTERS:
app.use(authRouter); // Es igual que ("/",authRouter)

app.use("/users", userRouter);
app.use("/upload", uploadRouter);

app.use(errorHandler);

// Solo los usuarios con el rol "admin" pueden acceder a esta ruta
app.get("/admin", authenticateHandler, authorize("admin"), (_req, res) => {
  res.json({ ok: true, message: "Bienvenido al panel de administración" });
});

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
export default app;