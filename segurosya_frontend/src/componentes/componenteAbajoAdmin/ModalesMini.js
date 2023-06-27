import { useEffect } from 'react';
import '../../index.css';
import './ModalesMini.css'

export function ModalEliminacionModelo (
        {
        ocultarModal,
        listaObjetos,
        nombreObjeto        
        }
    ) 
{
    if(listaObjetos.length === 0){
      ocultarModal("");
    }

    const cerrarModal= (accion) => {
      ocultarModal(accion);
    };

 

    return (
        <div className="fondo-opaco">
          <div className="modalEliminacion">
            
              
          <p>
            Seguro que desea eliminar estas marcas?
          </p>
          <ul>
            {listaObjetos.map(marca => (
              <li key={marca.idMarca}> Id: {marca.idMarca},  Nombre: {marca.nombre} </li>
            ))}            
          </ul>           
            <button >Cancelar</button>
            <button >Confirmar</button>
          </div>
        </div>
    );
}

export function ModalEliminacionMarca ({
    setModal,
    listaObjetos,
    confirmarEliminacion 
  }) {

  if(listaObjetos.length === 0){
    setModal(false);
  }

  const confirmarModal= () => {
    confirmarEliminacion();
    // setModal(true);
  };

  const cancelarModal = () => {
    setModal(false);
  }

  return (
    <div className="fondo-opaco">
      <div className="modalEliminacion">
        
          
      <p>
        Seguro que desea eliminar estas marcas?
      </p>
      <ul>
        {listaObjetos.map(marca => (
          <li key={marca.idMarca}> Id: {marca.idMarca},  Nombre: {marca.nombre} </li>
        ))}            
      </ul>           
        <button onClick={cancelarModal}>Cancelar</button>
        <button onClick={confirmarModal}>Confirmar</button>
      </div>
    </div>
  );
}