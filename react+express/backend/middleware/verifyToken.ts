import express, { NextFunction } from 'express'; 
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
  dotenv.config(); 

  const JWT_SECRET = process.env.JWT_SECRET as string; 

const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
  const authHeader = req.headers["Authorization"]; 

  if (!authHeader || typeof authHeader !== "string"){
    return res.status(401).json({message: 'No token provided'});
  }
  const token = authHeader.split(" ")[1]; 
  if (!token){  
    return res.status(401).json({message: 'Invalid token format'}); 
  }

  try{
    const decoded=jwt.verify(token, JWT_SECRET); 
    req.user = decoded;
    next();  
  }catch (error){
    return res.status(403).json({message: 'Invalid or expired token'})
  }
}

export default authMiddleware; 