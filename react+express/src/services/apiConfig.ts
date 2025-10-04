import axios from 'axios'; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // envia cookies automaticamente 
});  // necesitamos el archivo vite-env.d.ts para que funcione el import meta

// eliminamos interceptor, no lo necesitamos si usamos cookie
export default api; 