// se va a encargar de hacer la PETICION al microservicio
// mantenemos la url en .env (mayor seguridad)
import axios from 'axios';
import dotenv from 'dotenv';
import User from '../models/User'; 
dotenv.config();

const urlMicroservice = process.env.URLMICROSERVICE

const matchService = {
  matchUser: async (userId: string)=>{
    if (urlMicroservice) { // TENEMOS QUE VERIFICAR QUE EXISTA LA URL EN .ENV 
    const {data: matches} = await axios.get(urlMicroservice);
    if (!Array.isArray(matches) || matches.length === 0) return []; 
    
  }
  }
}