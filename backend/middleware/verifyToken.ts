import express, { NextFunction } from 'express'; 
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
  dotenv.config(); 

  declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

  const JWT_SECRET = process.env.JWT_SECRET as string; 

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
try{
  const token = req.cookies.access_token; 
  if (!token){  
    return res.status(401).json({message: 'Invalid token format'}); 
  }
  

    const decoded=jwt.verify(token, JWT_SECRET) as {userId: string, email: string}; 
    req.user = {
      userId: decoded.userId,  
      email: decoded.email
    }
    next();  
  }catch (error){
    return res.status(403).json({message: 'Invalid or expired token'})
  }
}

export default authMiddleware; 