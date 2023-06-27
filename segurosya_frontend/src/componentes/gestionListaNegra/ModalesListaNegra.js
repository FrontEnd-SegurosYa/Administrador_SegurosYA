import React, { useRef, useState, useEffect } from 'react';
import "./ModalesListaNegra.css";

export function ModalCargaMasivaListaNegra ({listaErrores,setActualizarLista,setMostrarModal}){
    return(
        <>
            <p>
                Se presentan a continuacion los siguientes errores:
            </p>
            <ul>
                {listaErrores.map((error,indice) => (
                    <li key={indice}> {error} </li>
                ))}
            </ul>
            <button/>
            
        </>
    );
}