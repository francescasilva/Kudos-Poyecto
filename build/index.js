"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("./middlewares/session"));
const auth_router_1 = __importDefault(require("./routers/auth-router"));
const user_router_1 = __importDefault(require("./routers/user-router"));
const upload_1 = __importDefault(require("./controlador/upload"));
const error_1 = __importDefault(require("./middlewares/error"));
const authenticate_1 = require("./middlewares/authenticate");
const authorize_1 = require("./middlewares/authorize");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env["PORT"] || 5500;
// Configurar CORS para permitir solicitudes desde el frontend
const corsOptions = {
    origin: process.env["CLIENT_ORIGIN"], // http:localhost:5173
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, session_1.default)());
// ROUTERS:
app.use(auth_router_1.default); // Es igual que ("/",authRouter)
app.use("/users", user_router_1.default);
app.use("/upload", upload_1.default);
app.use(error_1.default);
// Solo los usuarios con el rol "admin" pueden acceder a esta ruta
app.get("/admin", authenticate_1.authenticateHandler, (0, authorize_1.authorize)("admin"), (_req, res) => {
    res.json({ ok: true, message: "Bienvenido al panel de administración" });
});
app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
exports.default = app;
