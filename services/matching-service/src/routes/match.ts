import { Router } from "express";
import { MatchingAlgorithm } from "../matcher";


const matchRouter = Router(); 
const matcher = new MatchingAlgorithm(); 

matchRouter.get('/:userId',async (req, res)=>{
    try{
      const {userId} = req.params; 
      const matches = matcher.findMatchUsers(userId, 10); 
      res.json(matches); 
    }catch(error){
       console.error("Error en el route de match: ", error);
       res.status(500).json({message: "Error en el router de match", error});  
    }
})

export default matchRouter; 