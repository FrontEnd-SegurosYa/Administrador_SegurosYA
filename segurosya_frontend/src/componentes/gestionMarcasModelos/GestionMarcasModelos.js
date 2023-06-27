import React, { useState, useEffect } from 'react';
import './GestionMarcasModelos.css';
import '../../index.css';
import { eliminarMarca, obtenerMarcas, obtenerModelosXMarcas } from './funcionesExtras';
import {BotonesAdminMiniMarca} from '../componenteAbajoAdmin/BotonesMini';
import { ModalEliminacion } from '../componenteAbajoAdmin/ModalesMini';

function GestionMarcasModelos() {

    const [listaMarcas,setListaMarcas] = useState([]);
    const [marcaSeleccionada,setMarcaSeleccionada] = useState([]);
    const [actualizarListaMarcas, setActualizarListaMarcas] = useState(false);


    const [listaModelos,setListaModelos] = useState([]);
    const [modelosSeleccionados,setModelosSeleccionados] = useState([]);
    const [actualizarListaModelos, setActualizarListaModelos] = useState(false); 

    
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

    const seleccionMarca = (marca) => {
        if(marcaSeleccionada.some(marcaAux => {
            return marcaAux.idMarca === marca.idMarca;
        }) && marcaSeleccionada.length === 1){
            setMarcaSeleccionada([]);
            setListaModelos([]);
        }else{
            setMarcaSeleccionada([ marca ]);
            obtenerModelosXMarcas(marca.idMarca)
            .then(nuModelos => {
                setListaModelos(nuModelos);
                setModelosSeleccionados([]);
            })
            .catch(error => {
                console.error(error);
            });
        }
    };

    const seleccionModelo = (idModelo) => {
        if (modelosSeleccionados.includes(idModelo)) {
            setModelosSeleccionados(modelosSeleccionados.filter((id) => id !== idModelo));
        } else {
            setModelosSeleccionados([...modelosSeleccionados, idModelo]);
        }
    };

    const refrescarMarcas = () => {
        
    };


    useEffect( () => {
        
        obtenerMarcas()
        .then( data => {
            const nuListaMarcas = data;
            setListaMarcas(nuListaMarcas);
            setMarcaSeleccionada([]);
            setListaModelos([]);
            setModelosSeleccionados([]);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        if(actualizarListaMarcas){
            setActualizarListaMarcas(false);
        }

        if(actualizarListaModelos){
            setActualizarListaModelos(false);
        }

    }, [actualizarListaMarcas,actualizarListaModelos] );

    return (
        <>
            

            <div id='ContenedorTablasMarcaModelo'>
                <div className='contenedortabla'>
                    <p className='TituloTablas'>Marcas</p>
                    <table className='tabla'>
                    
                    <thead>
                        
                        <tr className='CabeceraTablas'>
                            
                            <td>                                
                            </td>
                            <td>
                                Codigo
                            </td>
                            <td>
                                Nombre
                            </td>

                        </tr>
                    </thead>

                    <tbody>
                        {listaMarcas.map(marca => (
                            <tr key={marca.idMarca}>
                                <td >
                                    <input
                                        type='checkbox'
                                        checked={marcaSeleccionada.some((marcaAux) => {
                                            return marcaAux.idMarca === marca.idMarca;
                                          })}
                                        onChange={() => seleccionMarca(marca)}
                                    />
                                </td>
                                <td> {marca.idMarca} </td>
                                <td> {marca.nombre} </td>
                            </tr>
                        ))}
                    </tbody>

                    </table>
                    <BotonesAdminMiniMarca 
                        objetosSeleccionados={marcaSeleccionada}
                        setObjetosSeleccionados={setMarcaSeleccionada}
                        eliminarObjeto={eliminarMarca}
                        setActualizarVentana={setActualizarListaMarcas}
                    />
                </div>
                
                <div className='contenedortabla'>
                {listaModelos.length > 0 ? 
                        (
                        <>
                            <p className='TituloTablas'>Modelos</p>
                            <table className='tabla'>
                            
                            <thead >
                                
                                <tr >
                                    <td>                                
                                    </td>
                                    <td>
                                        Codigo
                                    </td>
                                    <td>
                                        Nombre
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                {listaModelos.map(modelo => (
                                    <tr key={modelo.idModelo}>
                                        <td >
                                            <input
                                                type='checkbox'
                                                checked={modelosSeleccionados.includes(modelo.idModelo)}
                                                onChange={() => seleccionModelo(modelo.idModelo)}
                                            />
                                        </td>
                                        <td> {modelo.idModelo} </td>
                                        <td> {modelo.nombre} </td>
                                    </tr>
                                ))}
                            </tbody>

                            </table>
                            {/* <BotonesAdminMini
                                
                            /> */}
                        </>
                        )                   
                :
                    (
                    <p>
                        No hay contenido.
                    </p>
                    )

                }  
                </div>         
                

                
            </div>
        </>
    );
}

export default GestionMarcasModelos;