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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const uploadRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
uploadRouter.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'src', 'views', 'index.html'));
});
uploadRouter.post("/files", upload.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ ok: false, message: "No se ha subido ningún archivo" });
    }
    console.log(req.file);
    const filepath = req.file.path;
    const results = [];
    const validateCSV = (data) => {
        const validRecords = [];
        const errorRecords = [];
        console.log(data);
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        data.forEach((record, index) => {
            let isValid = true;
            const errors = {};
            // Validar que exista el campo 'id'
            if (isNaN(record.id) || record.id <= 0) {
                isValid = false;
                errors['id'] = "El campo 'id' debe ser un número positivo.";
            }
            if (!record.name) {
                isValid = false;
                errors['name'] = "El campo 'name' no puede estar vacío.";
            }
            if (!isValidEmail(record.email)) {
                isValid = false;
                errors['email'] = "El formato del campo 'email' es inválido.";
            }
            if (isNaN(record.age) || record.age <= 0) {
                isValid = false;
                errors['age'] = "El campo 'age' debe ser un número positivo.";
            }
            if (!record.role) {
                isValid = false;
                errors['role'] = "El campo 'role' no puede estar vacío.";
            }
            if (isValid) {
                validRecords.push(record);
            }
            else {
                errorRecords.push({ row: index + 1, details: errors });
            }
        });
        return { isValid: errorRecords.length === 0, data: { success: validRecords, errors: errorRecords } };
    };
    fs.createReadStream(filepath)
        .pipe((0, csv_parser_1.default)({ separator: ';' }))
        .on('data', (data) => {
        results.push({
            id: parseInt(data.id, 10),
            name: data.name,
            email: data.email,
            age: parseInt(data.age, 10),
            role: data.role
        });
    })
        .on('end', () => {
        console.log(results);
        const validationResults = validateCSV(results);
        if (validationResults.isValid) {
            res.json({ ok: true, message: "Los datos son válidos", data: validationResults.data });
        }
        else {
            res.status(400).json({ ok: false, message: "Hubo errores en los datos", data: validationResults.data });
        }
    });
    return;
});
exports.default = uploadRouter;
// const results: { id: number, name: string,email: string, age: number, role: string }[] = [];
// fs.createReadStream('uploads\\prueba.csv')
// .pipe(csv({}))
// .on('data', (data) => results.push(data))
// .on('end', () => {
//   console.log(results);
