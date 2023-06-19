import React, { useEffect } from 'react';
import '../index.css';

import GestionClientes from '../componentes/gestionClientes/GestionClientes';
import Navbar from '../componentes/navbar/Navbar' 

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AdminClientes () {
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
            <Navbar estado = "Clientes" cuenta={cuenta} />
            <GestionClientes/>
        </>
    );
}

export default AdminClientes;