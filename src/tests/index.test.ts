import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../index';  // exportar  app desde index.ts

describe('GET /', () => {

  it('should return html', async () => {
    const res = await request(app).get('/upload');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Subir archivo');
  });

  it('should return an error message for invalid input', async () => {
    const res = await request(app)
      .post('/upload/files')
      .send();

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toEqual('No se ha subido ningún archivo');
  });

  it('should return a success message for valid input file', async () => {
    const res = await request(app)
      .post('/upload/files')
      .send({ file: 'John', age: 30 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, John. You are 30 years old.' });
  });
  
});