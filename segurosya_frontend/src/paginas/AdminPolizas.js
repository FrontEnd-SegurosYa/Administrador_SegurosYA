import React, { useEffect } from 'react';
import '../index.css';

import Navbar from '../componentes/navbar/Navbar' 

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GestionPolizas from '../componentes/gestionPolizas/GestionPolizas';


function AdminPolizas () {
    const location = useLocation();
    const navigate = useNavigate();
    var cuenta = null;

    if(location.state !== null){
        cuenta = location.state.cuenta;
    } 

    //Redirigir a inicio si no se realizo el flujo anterior
    useEffect(() => {
        if(location.state === null){
        navigate("/");
        }
    },[]);

    return (
        <>
            <Navbar estado = "Polizas" cuenta={cuenta} />
            <GestionPolizas/>
        </>
    );
}

export default AdminPolizas;