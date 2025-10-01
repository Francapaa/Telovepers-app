import express from 'express';
import { Request, Response } from 'express';
import userService from '../services/userService';

const userControllers = {
  getProfile: async (req: Request, res: Response) =>{
    try{
      if (!req.userId){
        return res.status(401).json({message: 'No authenticated'});
      }
      
      const userProfile = await userService.getUserProfile(req.userId);
      res.status(200).json({user: userProfile});
    }catch(error: any){
      console.error('Error obtain profile', error);
      res.status(500).json({message: error.message || 'Error obtain profile'});
    }
  },
  updateProfile: async(req: Request, res: Response) =>{
    try{
      if (!req.userId){
        return res.status(401).json({message: 'No authenticated'});
      }
      const {
        bio,
        location,
        workPreference,
        availability,
        role,
        skills,
        languages,
        lookingFor
      } = req.body; 
      if (bio === undefined && bio.length < 50){
        return res.status(400).json({message: 'Bio must be at least 50 characters'}); 
      }
      const validWorkPreference = ['Remote', 'Presencial', 'Hybrid'];
      if (!workPreference && !validWorkPreference.includes(workPreference)){
        return res.status(400).json({message:'Invalid work preference'}); 
      }
      const validAvailabilities = ['Full-time', 'Part-time','Flexible','Weekends'];
      if (!availability && !validAvailabilities.includes(availability)){
        return res.status(400).json({message: 'Invalid availability'});
      }
      const validRoles = ['Technical', 'business', 'product', 'design', 'marketing', 'sales', 'finance']; 
      if (!role && !validRoles.includes(role)){
        return res.status(400).json({message: 'Invalid role/s'});
      }

      const updateUser = await userService.updateUserProfile(
        req.userId,
        req.body
      ); 
      res.status(200).json({message: 'Profile updated', user: updateUser});
    }catch(error: any){
      console.error('Error obtain profile', error);
      res.status(500).json({message: error.message || 'Error obtain profile'});
    }
  },
  partialUpdateProfile: async (req: Request, res: Response) =>{
    try{
      if (!req.userId){
        return res.status(401).json({message: 'No authenticated'});
      }
      const updatedUser = await userService.updateUserProfile(
        req.userId,
        req.body
      );
      res.status(200).json({message: 'Profile updated', user: updatedUser});
    }catch(error: any){
      console.error('Error obtain profile', error);
      res.status(500).json({message: error.message || 'Error updating'}); 
    }
  }
}

export default userControllers; 