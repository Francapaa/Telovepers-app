import axios from 'axios'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});  // necesitamos el archivo vite-env.d.ts para que funcione el import meta

api.interceptors.request.use((config) =>{
  const token = cookieStore.get('token');
  if (token){
        config.headers =  config.headers ||{} as any;     
        config.headers.Authorization = `Bearer ${token}`;
  }
  return config;  
})

export default api; 