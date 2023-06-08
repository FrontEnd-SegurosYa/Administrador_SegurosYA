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
  var informacionCuenta = null;

  if(location.state !== null){
    informacionCuenta = location.statea;
  } 

  // //Redirigir a inicio si no se realizo el flujo anterior
  // useEffect(() => {
  //   if(location.state === null){
  //     navigate("/");
  //   }
  // },[]);

  return (
      <>
        <Navbar estado="Inicio" informacionCuenta={informacionCuenta}/>
        
      </>
    );
  }
  
export default PaginaInicio;
