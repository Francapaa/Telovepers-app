import express from 'express'; 
const authRouter = express.Router(); 
import authController from '../controllers/authControllers';
import  authMiddleware from '../middleware/verifyToken';

authRouter.post('/register', authController.register );
authRouter.post('/login', authController.login );
authRouter.get('/verify', authMiddleware, authController.verify); 
authRouter.post('/logout', authController.logout); 

export default authRouter; 
