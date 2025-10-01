export default interface registerDto{
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  password: string
}
export default interface loginDto{
  email: string, 
  password: string
}

export default interface authResponse{
  token: string,
  User:{
  id: string, 
  name: string, 
  lastname: string,
  email: string,
  phoneNumber: string
  }
}