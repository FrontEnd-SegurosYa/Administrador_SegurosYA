import React, { useEffect } from 'react';
import '../index.css';

import {Presentacion} from '../componentes/presentacion/Presentacion'
import Navbar from '../componentes/navbar/Navbar' 
import {ContenedorPrincipal} from '../componentes/contenedorPrinc/ContenedorPrincipal' 

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PaginaInicio() {
  const location = useLocation();
  const navigate = useNavigate();
  var cuenta = null;  


  if(location.state !== null){
    cuenta = location.state.cuenta;
  } 

  const estiloTemporal = {
    color: 'white',
    fontSize: '60px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  //Redirigir a inicio si no se realizo el flujo anterior
  useEffect(() => {    
    if(location.state === null){
      navigate("/");
    }
  },[]);

  

  return (
      <>
        <Navbar estado="Inicio" cuenta={cuenta }/>
        <p style={estiloTemporal}>
          Bienvenido {cuenta && cuenta.nombre+" "+cuenta.apellidoPaterno+" "+cuenta.apellidoMaterno}.
        </p>
      </>
    );
  }
  
export default PaginaInicio;
