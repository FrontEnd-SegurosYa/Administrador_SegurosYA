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
        labels: [],
        datasets: [
        ],
    });
    var sum = 0;
    var i = 0;
    while(listaDatos[i]){
        sum += listaDatos[i].cantidad_vendida;
        i++;
    }
    useEffect( () => {
        obtenerDatosReporte()
        .then( lista => {
                setListaDatos(lista);
                console.log(lista);
                setUserData({
                    labels: lista.map((data) => data.Nombre),
                    datasets: [
                        {
                        label: "Ventas de Soat",
                        data: lista.map((data) => data.cantidad_vendida),
                        backgroundColor: ["#3E54AC"],
                        },
                    ],
                });
        }).catch( error => {
            console.error('Error:', error);
        });
    }, [] );
    
    
    
    return (
        <div data-testid='reporteSoatVendidos'>
            <div className='Imagen'>
                <img className='imgReporte' src={reporte}/>
            </div>
            <div className='DatosReporte'>
                <div className = 'GraficaReporte'>
                    <BarChart chartData={userData}/>
                </div>
                <div className = 'NumerosReporte'>
                    <div className = 'CotizacionesAlMes'>
                        <h3>Cotizaciones durante el mes</h3>
                        <h1>{sum}</h1>
                        <br></br>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
export default ReporteSoatVendidos;
