import User from "../models/User";
import authService from "../services/authService";
import { Request, Response } from "express";

const authController = {
  register: async (req: Request, res: Response) =>{
    try {
      if (!req.body) console.error("No hay nada en la request");
      const result = await authService.registerUser(req.body); 
      res.status(201).json({message: "Registro exitoso: ", result});
      // manejo de ux mejor => en front-end si este controller da como resultado (201)
      // => deberia mandarlo a la pagina de login (navigate(/login))
    }
    catch(error: any){
      console.error('Hubo un error', error);
      return res.status(500).json({message: 'Hubo un error'}); 
    }
  },
  login: async (req: Request, res: Response) =>{
    try {
      const {token, User} = await authService.loginUser(req.body); 
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      res.status(201).json({message:'Login exitoso', User});
    }
   catch (error: any){
    console.error('Hubo un error', error); 
    return res.status(409).json({message: 'Hubo un error' + error.message});
   } 
  },
  verify: async (req: Request, res: Response) =>{
    res.status(200).json({authenticated: true, userId: req.user}); 
  },
  logout: async(req: Request, res: Response) =>{
    res.clearCookie('acces_token');
    res.status(200).json({message: 'Logout succesful'}); 
  }
}
export default authController; 