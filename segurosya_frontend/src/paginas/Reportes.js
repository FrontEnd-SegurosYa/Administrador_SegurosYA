import React, { useEffect } from 'react';
import '../index.css';

import Navbar from '../componentes/navbar/Navbar' 
import ModuloReportes from '../componentes/reportes/ModuloReportes';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Reportes () {

    const location = useLocation();
    const navigate = useNavigate();
    var informacionCuenta = null;

    if(location.state !== null){
        informacionCuenta = location.statea;
    } 

    // //Redirigir a inicio si no se realizo el flujo anterior
    // useEffect(() => {
    //     if(location.state === null){
    //     navigate("/");
    //     }
    // },[]);

    return (
        <>  
            <Navbar estado="Reportes" informacionCuenta={informacionCuenta} />
            <ModuloReportes/>
        </>
    );
}

export default Reportes;