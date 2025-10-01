import { Routes, Route } from 'react-router-dom';
import { RegisterForm } from './pages/register';
import { CreateLogIn } from './pages/logInComponent';
import {CreateLandingPage} from './pages/principalLanding';
const App = () => {
   return (
      <>
         <Routes>
            <Route path ="/" element={<CreateLandingPage/>}/>   
            <Route path="/login" element={<CreateLogIn/>} />
            <Route path="/register" element={<RegisterForm/> }/>
         </Routes>
      </>
   );
};

export default App;