import type authResponse from '../typesFront/auth';
import api from './apiConfig';

export const register = async (data:{name: string, lastname: string, phoneNumber: string, email: string, password: string})=>{
  console.log("Base URL", import.meta.env.VITE_API_URL);
  console.log("Enviando peticion a", '/auth/register');  
  return api.post('/auth/register', data); 
}

export const loginUser = async(data: {email: string, password: string})=>{
  console.log("Base URL", import.meta.env.VITE_API_URL);
  return api.post<authResponse>('/auth/login', data); // nos devuelve todo pero usamos solo el token
}
