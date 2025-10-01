import express from 'express';   
import path from 'path'; 
import mongoose from 'mongoose'; 
import { connect } from 'http2';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express(); 
const PORT = 3001;


const myKey = process.env.DATABASE;

const connectDB = async ()=>{
if (myKey){
mongoose.connect(myKey)
.then(()=> console.log("BASE DE DATOS CONECTADA"))
.catch((error)=> console.log("ERROR EN LA BASE DE DATOS", error));
} 
}

export default connectDB; 
