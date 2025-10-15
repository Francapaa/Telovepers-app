import { Routes, Route, Navigate, replace} from 'react-router-dom';
import { RegisterForm } from './pages/register';
import { CreateLogIn } from './pages/logInComponent';
import {CreateLandingPage} from './pages/principalLanding';
import { Onboarding } from './pages/createProfile';
import { useEffect, useState } from 'react';
import api from './services/apiConfig';
import React from 'react'; 

const ProtectedRoute = ({children}: {children: React.ReactNode}) =>{
   const [isAuth, setIsAuth] = useState <Boolean | null > (null); 
  try{ 
   useEffect(()=>{
      api.get("/auth/verify", {withCredentials: true})
      .then(()=>{setIsAuth(true)})
      .catch(()=>{setIsAuth(false)}); 
   }, []);

   if (isAuth == null) return <h3>Cargando...</h3>;
   if (!isAuth)return <Navigate to = "/login" replace />
  }catch(error){
    console.error(error);
    throw new Error("TUVIMOS UN ERROR EN EL APP.TSX " + error);
  }
   return <>{children}</>; 
}


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateLandingPage />} />
      <Route path="/login" element={<CreateLogIn />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/home"
        element={
         <ProtectedRoute>
            <Onboarding />
         </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default App;