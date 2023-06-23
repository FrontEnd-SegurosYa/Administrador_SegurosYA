import React, { useEffect } from 'react';
import {useState} from 'react';
import reporte from '../reporteSoatVendidos/Reporte.png';
import BarChart from './BarChart.js';
import './ReporteSoatVendidos.css';
import {UserData} from './Data';
import {obtenerDatosReporte} from './solicitarInfoReporte.js';

function ReporteSoatVendidos() {
    const [listaDatos, setListaDatos] = useState([]);
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.Nombre),
        datasets: [
            {
            label: "Ventas de Soat",
            data: UserData.map((data) => data.cantidad_vendida),
            backgroundColor: ["blue"],
            },
        ],
    });
    var sum = 0;
    var i = 0;
    while(UserData[i]){
        sum += UserData[i].cantidad_vendida;
        i++;
    }
    console.log(sum);
    useEffect( () => {
        obtenerDatosReporte()
        .then( listaDat => {
                setListaDatos(listaDat);
                console.log(listaDat);
        }).catch( error => {
            console.error('Error:', error);
        });
    }, [] );
    
    
    
    return (
        <>
            <div className='Imagen'>
                <img className='imgReporte' src={reporte}/>
            </div>
            <div className='DatosReporte'>
                <div className = 'GraficaReporte'>
                    <BarChart chartData={userData}/>
                </div>
                <div className = 'NumerosReporte'>
                    <div className = 'IngresoBrutoAnual'>
                        <h2>Ingreso bruto anual a la fecha</h2>
                        <h4>24 de abril 2023</h4>
                        <h1>S/. 1890</h1>
                        <h4>miles de soles</h4>
                    </div>
                    <div className = 'CotizacionesAlMes'>
                        <h2>Cotizaciones durante el mes</h2>
                        <br/><br/>
                        <h1>{sum}</h1>
                    </div>
                </div>
            </div>
        </>
    );
  }
  
export default ReporteSoatVendidos;
