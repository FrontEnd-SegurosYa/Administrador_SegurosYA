import React from 'react';
import '../index.css';

import GestionClientes from '../componentes/gestionClientes/GestionClientes';
import Navbar from '../componentes/navbar/Navbar' 

function AdminClientes () {
    return (
        <>
            <Navbar estado = "Clientes" />
            <GestionClientes/>
        </>
    );
}

export default AdminClientes;