import express from 'express';
import User from '../models/User'; 
import { error } from 'console';


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
  throw new Error('Error with database');
}
},
updateUserProfile: async( userId: string, updateData:any)=>{
  try{
    const profileCompleted = calculateProfileCompletition(updateData);
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        profileCompleted,
        onboardingCompleted: profileCompleted >= 90,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    ).select('-password'); 
    if (!user){
      throw new Error('No user found'); 
    }
    return user; 
  }catch(error){
    console.error(error); 
    throw new Error('Error updating your profile');
  }
}
};

function calculateProfileCompletition (userData: any): number{
  let score = 20; // del register 

  if (userData.bio && userData.bio.length >= 20){
    score += 15; 
  }
  if (userData.location.country && userData.location.city){
    score+=10; 
  }
  if (userData.workPreference){
    score+=10; 
  }
  if(userData.availability){
    score+=10; 
  }
  if (userData.role){
    score += 15;
  }
  const totalSkills = 
    (userData.skills?.programming?.length || 0) +
    (userData.skills?.tools?.length || 0) +
    (userData.skills?.expertise?.length || 0);
  
  if (totalSkills >= 3) {
    score += 15;
  } else if (totalSkills > 0) {
    score += (totalSkills / 3) * 15; // Proporcional
  }
  
  // Looking for roles (15%)
  if (userData.lookingFor?.roles?.length > 0) {
    score += 15;
  }
  
  return Math.min(Math.round(score), 100);
}


export default userService; 