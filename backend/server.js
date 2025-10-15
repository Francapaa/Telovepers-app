import express from 'express';
import authRouter from './routes/auth';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); 

const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()); // middleware
app.set('trust proxy', 1);
app.use('/api/auth', authRouter);
app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PORT: ${PORT}`);
});
