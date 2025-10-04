import api from './apiConfig'; 


export const getProfile = async () =>{
  const response = await api.get('/user/profile'); 
  return response.data;
}

export const updateProfile = async(userData: any)=>{
  const response = await api.put('/user/profile');
  return response.data; 
}

export const partialUpdateProfile = async(userData: any) =>{
  const response  = await api.patch ('/user/profile/partial');
  return response.data; 
}