import React, { useEffect } from 'react';
import '../index.css';

import Navbar from '../componentes/navbar/Navbar' 
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReporteSoatVendidos from '../componentes/reporteSoatVendidos/ReporteSoatVendidos';

function PaginaReporteSoatVendidos () {

    const location = useLocation();
    const navigate = useNavigate();
    var cuenta = null;

    if(location.state !== null){
        cuenta = location.state.cuenta;
    }

    return (
        <>  
            <Navbar estado="Reportes" cuenta={cuenta} />
            <ReporteSoatVendidos/>
        </>
    );
}

export default PaginaReporteSoatVendidos;