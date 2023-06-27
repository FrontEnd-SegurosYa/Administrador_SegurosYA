import React, { useRef, useState, useEffect } from 'react';
import "./Modales.css";

export function ModalCargaMasivaListaNegra ({listaErrores,setActualizarLista,setMostrarModal}){
    
    const cerrarModal = () => {
        setActualizarLista(true);
        setMostrarModal(false);
    };
    
    return(
        <>
            <div className="fondo-opaco">
                <div className="modalEliminacion">
                    <p>
                        Se presentan a continuacion los siguientes errores:
                    </p>
                    <ul>
                        {listaErrores.map((error,indice) => (
                            <li key={indice}> {error} </li>
                        ))}
                        
                    </ul>

                    <button onClick={cerrarModal} >Cerrar</button>
                </div>
            </div>
            
            
        </>
    );
}

export function ModalCargaMasivaGenerico ({listaErrores,setMostrarModal}){
    
    const cerrarModal = () => {
        setMostrarModal(false);
    };
    
    return(
        <>
            <div className="fondo-opaco">
                <div className="modalEliminacion">
                    <p>
                        Se presentan a continuacion los siguientes errores:
                    </p>
                    <ul>
                        {listaErrores.map((error,indice) => (
                            <li key={indice}> {error} </li>
                        ))}
                        
                    </ul>

                    <button onClick={cerrarModal} >Cerrar</button>
                </div>
            </div>
            
            
        </>
    );
}

export function ModalEliminacionMarca ({listaObjetosSeleccionados,setListaObjetosSeleccionados,setActualizarLista,setMostrarModal}){    
    const cerrarModal = () => {
        setListaObjetosSeleccionados([]);        
        setActualizarLista(true);
        setMostrarModal(false);
    };    
    return(
        <>
            <div className="fondo-opaco">
                <div className="modalEliminacion">
                    <p>
                        Esta seguro de eliminar los siguientes objetos:
                    </p>
                    <ul>
                        {listaObjetosSeleccionados.map((error,indice) => (
                            <li key={indice}> {error} </li>
                        ))}
                        
                    </ul>

                    <button onClick={cerrarModal} >Cerrar</button>
                </div>
            </div>           
        </>
    );
}

