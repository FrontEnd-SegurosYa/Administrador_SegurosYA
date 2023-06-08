import React from 'react';
import '../index.css';

import Navbar from '../componentes/navbar/Navbar' 
import ModuloReportes from '../componentes/reportes/ModuloReportes';

function Reportes () {
    return (
        <>  
            <Navbar estado={"Reportes"}/>
            <ModuloReportes/>
        </>
    );
}

export default Reportes;