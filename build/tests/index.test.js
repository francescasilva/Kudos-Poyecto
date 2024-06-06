"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const index_1 = __importDefault(require("../index")); // exportar  app desde index.ts
(0, vitest_1.describe)('GET /', () => {
    (0, vitest_1.it)('should return html', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/upload');
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.text).toContain('Subir archivo');
    });
    (0, vitest_1.it)('should return an error message for invalid input', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/upload/files')
            .send();
        (0, vitest_1.expect)(res.statusCode).toBe(400);
        (0, vitest_1.expect)(res.body.message).toEqual('No se ha subido ningún archivo');
    });
    (0, vitest_1.it)('should return a success message for valid input file', async () => {
        const res = await (0, supertest_1.default)(index_1.default)
            .post('/upload/files')
            .send({ file: 'John', age: 30 });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body).toEqual({ message: 'Hello, John. You are 30 years old.' });
    });
});
