import express from 'express'; 
import authRouter from './routes/auth.js';
import connectDB from './config/database.js';
import cors from 'cors';
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';
dotenv.config(); 

const PORT = process.env.PORT; 
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json()); // middleware
app.use(cookieParser());
app.set('trust proxy', 1);

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter); 
connectDB(); 

app.listen(PORT, () =>{
  console.log(`SERVIDOR CORRIENDO EN PORT: ${PORT}`);
})