/*



ACA VAMOS A CREAR LOS TIPOS DE DATOS QUE VAMOS A USAR, PARA NO TENER PROBLEMAS A LA HORA DE PASAR
DATOS ENTRE LOS DIFERENTES ENDPOINTS Y ARCHIVOS




*/ 

export interface TypeUser{
  _id: string,
  name: string,
  lastName: string,
  location:{
    country: string,
    city: string
  }
  workPreference: string,
  availability: string,
  role: string,
  skills:{
    programming: string[],
    expertise: string[],
    tools: string[]
  },
  languages:{
    language: string[],
    proficiency: string
  },
  lookingFor:{
    description: string,
    roles: string[]
  }
}