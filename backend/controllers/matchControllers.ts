import {Request, Response} from 'express';
import matchService from '../services/matchService'; 

const matchController = {
  getUser: async (req: Request, res: Response) => {
    try{
        //verificamos token
        if (!req.user?.userId) res.status(401).json({message: "Unauthorized"});
        const recommendations = await matchService.matchUser(req.user?.userId);

    }catch(error){
      console.error("Error en match controller", error);
      res.status(500).json({message: "Error en match controller", error}); 
    }
  }


}