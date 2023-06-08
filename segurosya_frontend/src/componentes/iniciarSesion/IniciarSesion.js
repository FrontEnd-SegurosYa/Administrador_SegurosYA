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

  
    
  return (
    <div className='IniciarSesion'>
      <div className='Imagen'>
        <img className='ImgMujer' src={mujer}/>
      </div>
      <div className='Registrar'>
        <p className='Titulo'>Registrarse</p>
        <p> <input type='text' className= "Ingresa" placeholder="Correo electrónico" 
          {...register("correo",{
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
              }
            )
          }
        />          </p>
        <p><input className= "Ingresa" value="Contraseña"></input></p>
        <Link to={"/"}><p><button className="BotonIniciar">Iniciar sesión</button></p></Link>
        <a>¿No tienes una cuenta? </a> 
        <Link to={"/crearCuenta"}><a>Registrate</a></Link>
        <p><a>¿Has olvidado tu contraseña?</a></p>
        {/* <p>------------o------------</p>
        <Link to={"/"}><button className="BotonGoogle">Iniciar sesión con Google</button></Link> */}
      </div>
      <div className='Imagen'>
        <img className='ImgHombre' src={hombre}/>
      </div>
    </div>
  )
}

export default IniciarSesion;