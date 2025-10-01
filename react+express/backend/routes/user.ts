import express from 'express';
import userControllers from '../controllers/userControllers';
import  verifyToken  from '../middleware/verifyToken' ;

const userRouter = express.Router();


userRouter.get('/profile', verifyToken, userControllers.getProfile);
userRouter.put('/profile', verifyToken, userControllers.updateProfile);
userRouter.patch('/profile/partial', verifyToken, userControllers.partialUpdateProfile); 

export default userRouter;