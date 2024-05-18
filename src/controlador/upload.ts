import express from "express";
import multer from 'multer';

const uploadRouter = express.Router();
//const filesRouter = express.Router();

const upload =multer({ 
  dest: './uploads',
 })

uploadRouter.get("/", (_req, res ) => {
  
    res.sendFile( "c:/Users/MANUEL SILVA/codeable/proyectofinal/Kudos-Poyecto/src/views/index.html" );

  });

uploadRouter.post("/files",upload.single('archivo'), (req, res ) => {
  console.log(req.file);
   res.send("Todo bien!");   
  });





export default uploadRouter; //filesRouter;