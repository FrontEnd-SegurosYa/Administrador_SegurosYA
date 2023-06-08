import React from 'react';
import '../index.css';


import Navbar from '../componentes/navbar/Navbar' 

import GestionCotizaciones from '../componentes/gestionCotizaciones/GestionCotizaciones';

function AdminCotizaciones () {
    return (
        <>
            <Navbar estado = "Clientes" />
            <GestionCotizaciones/>
        </>
    );
}

export default AdminCotizaciones;