import { Link, Navigate } from 'react-router-dom';
import '../style/login.css'; 
import { useState} from 'react';
import{loginUser} from '../services/authService'; 
export function CreateLogIn(){

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [emailError,setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/; 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setEmail(value); 

    if (value && !emailRegex.test(value)){
        setEmailError("Enter a valid mail"); 
    }
    else{
      setEmailError(''); 
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent <HTMLInputElement>) =>{
    const value = e.target.value; 
    setPassword(value);

    if (value && !passwordRegex.test(value)){
      setPasswordError("Password must contains, at least one Number, upper case and special character!"); 
    }else{ 
      setPasswordError(''); 
    }
  }

  const handleTogglePassword = ()=>{
    setShowPassword(!showPassword); 
  }

  const handleButtonLogin = async (e: React.FormEvent) =>{
    e.preventDefault(); 
    try{ 
      const response = await loginUser({email, password}); // asi puedo definir 2 variables dentro de un objeto y pasarlo 
      console.log("Login pasado", response.data);
      Navigate('/home'); 
    }
    catch(error: any){
      console.error("Tuvimos un error" + error.message);
    }
  }


  return (
    <div className = "contenedor-logIn">
      <h1 className='title-login'>Login to Telovepers</h1>
      <form>
        <label htmlFor="correoElectronico-usuario">Enter your email</label>
        <input
          type="text" 
          name ="correoElectronico-usuario"
          placeholder = "tuemail@gmail/yahoo/icloud/etc.com"
          value={email} 
          onChange={handleEmailChange}/> 
        <div className="error-message-container">
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className='password-div'>
          <label htmlFor="password">Password</label>
          <input 
            type ={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="password"
            value={password}
            onChange={handlePasswordChange}/>
          <button
            type="button" 
            onClick={handleTogglePassword}
            className="toggle-password-btn"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="error-message-container">
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className ="button-send">
          <button className="button-to-send"
          onClick={handleButtonLogin}>
          Login</button>
          <Link to ="/register" className='register-account'>Don't have an account?<span className='register-login'>Register</span></Link>
        </div>
      </form>
    </div>
  )
} 