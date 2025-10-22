import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import express from 'express';

dotenv.config(); 

const app = express(); 
const myKey = process.env.DATABASE; 

const connectDB = async ()=>{
if (myKey){
  mongoose.connect(myKey)
  .then(()=>console.log("BASE DE DATOS CONECTADA"))
  .catch((error)=>console.error("ERROR CONECTANDO LA BASE DE DATOS EN SERVICE", error));
}
}

export default connectDB; 