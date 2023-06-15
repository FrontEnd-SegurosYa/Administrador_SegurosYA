import React, { Fragment } from 'react'
import "./IniciarSesion.css";
import '../../index.css'
import hombre from '../iniciarSesion/HombreLlaves.png'
import mujer from '../iniciarSesion/MujerTelefono.png'
import { Link } from 'react-router-dom';
import { useForm, Controller} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

//Utiles
import ubicacionesJSON from "./ubicaciones.json";
import { iniciarSesion } from './funcionesExtras';


export const IniciarSesion = () => {
  
  const navigate = useNavigate();
  const {register, handleSubmit,watch,formState: { errors }} = useForm();

  const onSubmit = (data) => {
    iniciarSesion(data.correo,data.constrasenha)
    .then(resultado => {
      if(resultado.response_msg === "Login Success"){
        alert("Inicio de sesion correcto.");
        navigate("/inicio",{state: {cuenta: resultado}});
      }else{
        alert("Inicio de sesion fallido.");
        return;
      }
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
    
  return (
    <div className='IniciarSesion'>
      <div className='Imagen'>
        <img className='ImgMujer' src={mujer}/>
      </div>
      <form className='Registrar' onSubmit={handleSubmit(onSubmit)}>
        <p className='Titulo'>Registrarse</p>
        <p> 
          <input type='text' className= "Ingresa" placeholder="Correo electrónico" 
            {...register("correo",{
                  required: true,
                  pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
                }
              )
            } 
          />          
        </p>
        <p>
          <input type='password' className= "Ingresa" placeholder="Contraseña"
            {...register("constrasenha",{
                  required: true,
                }
              )
            }></input>
        </p>
        <p><button className="BotonIniciar">Iniciar sesión</button></p>
        <a>¿No tienes una cuenta? </a> 
        <Link to={"/crearCuenta"}>Registrate</Link>
        <p><a>¿Has olvidado tu contraseña?</a></p>
        {/* <p>------------o------------</p>
        <Link to={"/"}><button className="BotonGoogle">Iniciar sesión con Google</button></Link> */}
      </form>
      <div className='Imagen'>
        <img className='ImgHombre' src={hombre}/>
      </div>
    </div>
  )
}

export default IniciarSesion;