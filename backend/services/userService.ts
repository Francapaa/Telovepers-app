import express from 'express';
import User from '../models/User'; 


const userService ={
getUserProfile: async (userId: string)=>{
try{
  const user = await User.findById(userId).select('-password'); 
  if (!user){
    throw new Error('No user found');
  }
  return user; 
}catch(error){
  console.error(error);
  throw error
}
},
updateUserProfile: async( userId: string, updateData:any)=>{
  try{
    
     const user = await User.findById(userId);
      if (!user) {
        throw new Error('No user found'); 
      }


    Object.assign(user, updateData);
    await user.save(); 
    
    const userObject = user.toObject; 
     
    return userObject; 
  }catch(error){
    console.error(error); 
    throw error; 
  }
}
};



export default userService; 