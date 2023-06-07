import './ModuloReportes.css';
import React, { useState } from 'react';


function ModuloReportes() {
    
    return (
        <>
            <div className='ContenedorReportes'>
                <div className="ContenedorBoton">
                    <button className="BotonReporte" disabled style={{ marginRight: '100px' }}>Reporte de Ventas de Pólizas</button>
                    <button className="BotonReporte" disabled >Reporte de Cotizaciones</button>
                </div>
                <div className="ContenedorBoton">
                    <button className="BotonReporte" disabled  style={{ marginRight: '100px' }}>Reporte de Clientes</button>
                    <button className="BotonReporte">Reporte SOAT más vendidos</button>
                </div>
            </div>
        </>
    );
}

export default ModuloReportes;
