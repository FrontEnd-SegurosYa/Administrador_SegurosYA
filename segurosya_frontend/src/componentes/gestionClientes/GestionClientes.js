import React from 'react';
import "./GestionClientes.css";
import '../../index.css'

//Bibliotecas
import { useTable } from "react-table";
import ReactTable from 'react-table';
import { useState, useEffect } from 'react';

//Funciones
import { obtenerClientes, dividirPaginas } from './funcionesExtras';


function GestionClientes () {
    const [listaClientes, setListaClientes] = useState([]);
    const [listaPaginas,setListaPaginas] = useState([[]]);
    const [indicePagina,setIndicePagina] = useState(0);

    const cabeceraTabla = [
        "",
        "Codigo",
        "Nombre Completo",
        "DNI",
        "Acciones"
    ];

    const cambioIndice = (event) => {
        const value = parseInt(event.target.value);
        setIndicePagina(value);
    };

    useEffect(() => {
        // fetch data
        obtenerClientes()
        .then( data => {
                setListaClientes(data);
                setListaPaginas(dividirPaginas(data));                
            }
        ).catch( error => {
                console.error('Error:', error);
            }
        ); 
        // console.log(listaPaginas);       
    }, []);

    return (
        <>
            <div id='ContenedorGestionClientes'>

                <table id='TablaCLientes'>
                    {/* Cabeceras */}
                    <thead>
                        <tr key={"Cabecera"}>
                            { 
                                cabeceraTabla.map( (cabecera) => (
                                        <th key={cabecera}>{cabecera}</th>
                                    )
                                )
                            }
                        </tr>
                    </thead>
                    {/* Cuerpo */}
                    <tbody>
                        {   
                            // listaClientes.slice(0,11).map( (cliente) => (
                            
                            listaPaginas[indicePagina].map( (cliente) => (
                                    <tr key={cliente.idCliente}>
                                        <td key={cabeceraTabla[0]}> <input type='checkbox'/> </td>
                                        <td key={cabeceraTabla[1]}> {cliente.idCliente} </td>
                                        <td key={cabeceraTabla[2]}> {cliente.nombre+" "+cliente.apellidoPaterno+" "+cliente.apellidoMaterno} </td>
                                        <td key={cabeceraTabla[3]}> {cliente.dni} </td>
                                        <td key={cabeceraTabla[4]}><button>Editar</button></td>
                                    </tr>                            
                                )
                            )
                        }
                        <tr>
                            <td>
                            {listaPaginas.length}
                            </td>                            
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    type='number'
                                    value={indicePagina}
                                    onChange={cambioIndice}
                                    max={listaPaginas.length-1}
                                    min="1"
                                />
                                <p>Int Variable: {indicePagina}</p>
                            </td>                            
                        </tr>
                    </tbody>
                    
                    
                </table>

            </div>
        </>
    );
}

export default GestionClientes;


