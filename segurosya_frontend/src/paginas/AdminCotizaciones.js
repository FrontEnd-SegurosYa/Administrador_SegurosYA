import React, { useEffect } from 'react';
import '../index.css';


import Navbar from '../componentes/navbar/Navbar' 

import GestionCotizaciones from '../componentes/gestionCotizaciones/GestionCotizaciones';

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminCotizaciones () {
    const location = useLocation();
    const navigate = useNavigate();
    var informacionCuenta = null;

    if(location.state !== null){
        informacionCuenta = location.statea;
    }


//     //Redirigir a inicio si no se realizo el flujo anterior
//     useEffect(() => {
//     if(location.state === null){
//       navigate("/");
//     }
//   },[]);

    return (
        <>
            <Navbar estado = "Cotizaciones" informacionCuenta={informacionCuenta} />
            <GestionCotizaciones/>
        </>
    );
}

export default AdminCotizaciones;