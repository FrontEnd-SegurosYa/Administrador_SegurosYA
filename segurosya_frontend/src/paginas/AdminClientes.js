import React, { useEffect } from 'react';
import '../index.css';

import GestionClientes from '../componentes/gestionClientes/GestionClientes';
import Navbar from '../componentes/navbar/Navbar' 

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminClientes () {
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
            <Navbar estado = "Clientes" informacionCuenta={informacionCuenta} />
            <GestionClientes/>
        </>
    );
}

export default AdminClientes;