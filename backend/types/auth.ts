import { ObjectId } from "mongoose"

export interface registerDto{
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  password: string
}
export interface loginDto{
  email: string, 
  password: string
}

export interface authResponse{
  token: string,
  User:{
  id: string, 
  name: string, 
  lastname: string,
  email: string,
  phoneNumber: string
  }
}