import api from './apiConfig'; 


export const getProfile = async () =>{
  const response = await api.get('/profile'); 
  return response.data;
}

export const updateProfile = async(userData: any)=>{
  const response = await api.put('/profile/profile', userData);
  return response.data; 
}

export const partialUpdateProfile = async(userData: any) =>{
  const response  = await api.patch ('/profile/partial', userData);
  return response.data; 
}
