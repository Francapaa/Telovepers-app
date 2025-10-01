import express from 'express';
const cors = require('cors');
require("dotenv").config();
import mongoose from 'mongoose';
const app = express();
const PORT = 3001;
const myKey = process.env.DATABASE;
const connectDB = async () => {
    if (myKey) {
        mongoose.connect(myKey)
            .then(() => console.log("BASE DE DATOS CONECTADA"))
            .catch((error) => console.log("ERROR EN LA BASE DE DATOS", error));
    }
};
export default connectDB;
