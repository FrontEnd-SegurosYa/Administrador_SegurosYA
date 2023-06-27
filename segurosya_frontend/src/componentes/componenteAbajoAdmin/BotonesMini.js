import React, { useState, useEffect } from 'react';
import { ModalEliminacion, ModalEliminacionMarca } from './ModalesMini';

export function BotonesAdminMiniMarca ({
        listaObjetos,
        objetosSeleccionados,
        setObjetosSeleccionados,
        eliminarObjeto,
        setActualizarVentana
    }) 
{   
    // console.log(objetosSeleccionados);
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false); 

    const [loading,setLoading] = useState(false);

    const handleEliminarClick = () => {
        setMostrarModalEliminacion(true);
        
    }

    const handleCancelarClick = () => {
        setMostrarModalEliminacion(false);
        
    }

    const confirmarEliminacion = () => {      
        objetosSeleccionados.map(objeto => {
            eliminarObjeto(objeto.idMarca);
        }); 
        setMostrarModalEliminacion(false);       
        setActualizarVentana(true);         
    }

    return(
        <>

            {mostrarModalEliminacion && 
                (<ModalEliminacionMarca
                    setModal={setMostrarModalEliminacion} 
                    listaObjetos={objetosSeleccionados}
                    confirmarEliminacion={confirmarEliminacion}
                />)
            }
            
            {loading &&
            
            }

            <div>
                <button>
                    Nuevo
                </button>
                <button>
                    Carga Masiva
                </button>
                <button onClick={handleEliminarClick}>
                    Eliminar            
                </button>                
            </div>
        </>

        
    );
    
    
}
