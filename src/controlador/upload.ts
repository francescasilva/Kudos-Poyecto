import express from "express";
import multer from 'multer';


import * as fs from 'fs'; 
import csv from 'csv-parser';

const uploadRouter = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

uploadRouter.get("/", (_req, res ) => {
  
    res.sendFile( "c:/Users/MANUEL SILVA/codeable/proyectofinal/Kudos-Poyecto/src/views/index.html" );

  });

  uploadRouter.post("/files", upload.single('archivo'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "No se ha subido ningún archivo" });
    }
  
    console.log(req.file);
    const filepath = req.file.path;
    const results: { id: number, name: string, email: string, age: number, role: string }[] = [];

    interface CSVRecord {
      id: number;
      name: string;
      email: string;
      age: number;
      role: string;
  }
  
  const validateCSV = (data: CSVRecord[]) => {
    const validRecords: CSVRecord[] = [];
    const errorRecords: { row: number, details: { [key: string]: string } }[] = [];
    console.log(data)
      const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
  
      data.forEach((record, index) => {
        let isValid = true;
        const errors: { [key: string]: string } = {};

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
        } else {
          errorRecords.push({ row: index + 1, details: errors });
        }
      });
  
      return { isValid: errorRecords.length === 0, data: { success: validRecords, errors: errorRecords } };
    };
  
    fs.createReadStream(filepath)
    .pipe(csv({ separator: ';' }))
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
        } else {
          res.status(400).json({ ok: false, message: "Hubo errores en los datos", errors: validationResults.data.errors });
        }
       
      });
      return 
  });
export default uploadRouter; 
// const results: { id: number, name: string,email: string, age: number, role: string }[] = [];
// fs.createReadStream('uploads\\prueba.csv')
// .pipe(csv({}))
// .on('data', (data) => results.push(data))
// .on('end', () => {
//   console.log(results);