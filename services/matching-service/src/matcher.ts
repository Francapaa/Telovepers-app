/*



ACA VAMOS A ESTAR CREANDO EL CORAZON DE LA APP, EL ALGORITMO PARA PODER RECOMENDARLE AL USUARIO
UN CO-FOUNDER CON EL QUE PODRIA LLEGAR A MATCHEAR. 




*/

import { User} from "./models/user";
import { TypeUser } from "./types";

export class MatchingAlgorithm{
  private weights = {
    role_match:0.35, 
    skills_overlap: 0.25,
    locatio: 0.15,
    work_style: 0.15,
    languages: 0.10
  }

  // luego en types creamos lo que serian los user
  calculateMatchScore(userA: any, userB:any){  
    
    const scores = {
      role_Match : this.roleMatch(userA,userB),
      skills_overlap: this.skillsOverlap(userA, userB),
      location: this.location(userA, userB),
      work_style: this.workStyle(userA, userB),
      languages: this.languages(userA, userB)
    }

      const finalScore = Object.entries(scores).reduce(
        (sum, [key, val]) => sum + val * this.weights[key as keyof typeof this.weights],
        0
      );
      return parseFloat(finalScore.toFixed(3)); 
  }

  public roleMatch(userA: TypeUser, userB:TypeUser): number{
    let score = 0;

    if (userA.lookingFor?.roles?.includes(userB.role)) score += 0.5; 
    if (userB.lookingFor?.roles?.includes(userA.role)) score += 0.5;
    return score; 
  }

  
  public skillsOverlap(userA: TypeUser, userB:TypeUser): number{
    const allUserA =  new Set([
      ...(userA.skills?.programming || []),
      ...(userA.skills?.expertise || []),
      ...(userA.skills?.tools || [])
    ]);
    
    const allUserB =  new Set([
      ...(userB.skills?.programming || []),
      ...(userB.skills?.expertise || []),
      ...(userB.skills?.tools || [])
    ]);
    
    const intersection = [...allUserA].filter((s)=>allUserB.has(s)).length;  
    const union = new Set([...allUserA, ...allUserB]).size;  
    
    if (union > 0){
      return intersection / union; 
    } 
    return 0; 
  }
  
  public workStyle(userA: TypeUser, userB:TypeUser): number{
  
  let score = 0; 
  if(userA.availability && userB.availability){
    if (userA.availability == userB.availability) return 0.5; 
    else if ([userA.availability, userB.availability].includes("hybrid")) score += 0.3
  }
  if (userA.workPreference && userB.workPreference){
    if (userA.workPreference == userB.availability) return 0.5;
    else if ([userA.workPreference, userB.workPreference].includes("flexible")) score += 0.3; 
  }

  return Math.min(score, 1); 
  }
  
  public location(userA: TypeUser, userB:TypeUser): number{
    if (!userA.location.country || !userB.location.country) return 0.5; 
    if (userA.location.country == userB.location.country &&
        userA.location.city == userB.location.city) return 1; 
    if (userA.location.country == userB.location.country && 
      userA.location.city != userB.location.city) return 0.7

      return 0.1; // aca no concuerda nada
  }
  public languages(userA: TypeUser, userB:TypeUser): number{
    if (!userA.languages.language && !userB.languages.language) return 0.5; 
    for (let i = 0; i<userA.languages.language.length; i++){
      for (let j = 0; j<userB.languages.language.length; j++){
        if (userA.languages.language[i] == userB.languages.language[j]) return 1; 
      }
    } 
    return 0; // no concuerda nada
  }
  public findMatchUsers = async (userId: string, limit: number = 10)=>{

  const findUser = await User.findById(userId);  // query que busca el user que nos pasaron
  const candidates = await User.find(this.buildPreFilter(findUser)).limit(100);

  const scoredUsers = candidates.map(userB =>(
    { 
    id: userB._id,
    score: this.calculateMatchScore(findUser , userB), 
  })); 

  return scoredUsers.sort((a,b)=> b.score - a.score).slice(0,limit); 

}

private buildPreFilter(userA: any){
  return {
    _id: {$ne: userA._id},
    "profileCompleted": {$gte: 60},
    "lookinFor.roles": userA.role,
    "role": {$in: userA.lookingFor?.roles || []},
    "location": userA.location?.country,
  };
}
}


/* DUDAS A RESOLVER => QUE DEVOLVEMOS, UN OBJECT DE 10 USUARIOS ?? NO ESCALA 
-  LO MEJOR ? UN ARRAY QUE CONTENGA IDs y PUNTAJES CORRESPODIENTES
-  EL SERVICE QUE INTERACTUA CON ESTE MICROSERVICIO SE ENCARGA DE BUSCAR ESOS IDs EN LA DB
-  LOS DEVOLVEMOS ORDENADOS X PUNTAJE MAS ALTO (1 => MAS ALTO, 0.0 => MAS BAJO)
*/ 
