/*



ACA VAMOS A CREAR LO QUE SERIA EL ENDPOINT PARA PODER CONSUMIR NUESTRO ALGORITMO DE MATCHING




*/

import express from 'express'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import connectDB from './config/db';

const PORT = process.env.PORT; 

const app = express(); 
app.use(express.json()); // middleware
app.set('trust proxy', 1);

connectDB(); 

app.listen(PORT ,() =>{
  console.log("EL SERVIDOR DEL ALGORITMO ESTA ESCUCHANDO EN EL PORT: ", PORT); 
})