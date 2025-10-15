"use client"

import React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../style/register.css"
import { register } from "../services/authService"
// Componente para el formulario de registro
export function RegisterForm() {
  // --- Lógica del componente ---

  // Estado para los valores de los inputs
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  //const [pais, setPais] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // Estado para los mensajes de error de validación
  const [emailError, setEmailError] = useState("")
  const [phoneError, setPhoneError] = useState("")

  // Expresiones regulares para la validación
  // Esta es una RegEx simple para email. Hay opciones más complejas.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Esta valida números de 10 a 15 dígitos con un '+' opcional al inicio.
  const phoneRegex = /^\+?[0-9]{10,15}$/

  const navigate = useNavigate()

  // Función para manejar el cambio en el input de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    if (value && !emailRegex.test(value)) {
      setEmailError("Email must contain @!"); 
    } else {
      setEmailError("")
    }
  }

  // Función para manejar el cambio en el input de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhoneNumber(value)

    if (value && !phoneRegex.test(value)) {
      setPhoneError("Please, enter a valid phone number!"); 
    } else {
      setPhoneError("")
    }
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    // espera un formEvent porque es un Form
    e.preventDefault() // Evita que la página se recargue

    // Re-validación final antes de enviar
    if (!emailRegex.test(email) || !phoneRegex.test(phoneNumber)) {
      console.error("Sorry, we couldn't send your info, check the mistakes!"); 
      // Evitamos enviar si hay errores
      return
    }


    const formData = {
      name,
      lastname,
      email,
      phoneNumber,
      password,
    }
    try {
      const response = await register(formData)
      console.log("Registro exitoso", response)

      alert("¡Registro exitoso! ")
      navigate("/login") // Redirigir a la página de inicio de sesión
    } catch (error: any) {
      console.error("Error en el registro: ", error.message)
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  // --- El JSX para la vista ---
  return (
    <form onSubmit={handleSubmit} className="form-entero">
      <h1 className="title-register">Register to Telovepers</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)} // e.target es el input (.value es lo que escribió)
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={handleEmailChange} required />
        {/* Mostramos el error si existe */}
        {emailError && <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone number</label>
        <input id="phone" type="tel" value={phoneNumber} onChange={handlePhoneChange} required />
        {phoneError && <p style={{ color: "red", fontSize: "12px" }}>{phoneError}</p>}
      </div>

      <div className="password-div">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          // El tipo del input depende del estado 'showPassword'
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button" // Es importante que sea 'button' para que no envíe el formulario
          onClick={handleTogglePassword}
          style={{
            // Posiciona el botón de forma absoluta dentro de su contenedor relativo
            position: "absolute",
            right: "3px",
            top: "50%",
            transform: "translateY(-20%)" /* Ajusta este valor si es necesario */,
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#a0a0a0",
            fontSize: "14px",
          }}
        >
          {/* Muestra un texto diferente según el estado */}
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button className="button-to-register">Register</button>
      <Link to="/login" className="iniciar-sesion">
          Do you have an account? Sign in!
      </Link>
    </form>
  )
}
