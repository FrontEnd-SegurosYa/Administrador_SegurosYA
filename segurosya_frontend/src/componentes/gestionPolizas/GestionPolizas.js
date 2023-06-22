import React, { useState, useEffect } from 'react';
import './GestionPolizas.css';
import '../../index.css';
import { obtenerClientes, dividirPaginas, obtenerPolizas } from './funcionesExtras';
import BotonesPaginacion from '../componenteAbajoAdmin/BotonesYPaginacion'
import BotonesYPaginacionEstandar from '../componenteAbajoAdmin/BotonesYPaginacionEstandar'


const MAX_LINEAS_POR_PAGINA = 15;
const CANTIDAD_LINEAS_POR_DEFECTO = 10;

function GestionPolizas() {
  const [listaPolizas, setListaPolizas] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);
  const [cantidadLineas, setCantidadLineas] = useState(CANTIDAD_LINEAS_POR_DEFECTO);
  const [polizasSeleccionadas, setPolizasSeleccionadas] = useState([]);

  const [actualizarLista, setActualizarLista] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);




  const seleccionCliente = (idCliente) => {
    if (polizasSeleccionadas.includes(idCliente)) {
      setPolizasSeleccionadas(polizasSeleccionadas.filter((id) => id !== idCliente));
    } else {
      setPolizasSeleccionadas([...polizasSeleccionadas, idCliente]);
    }
  };

  

  const cabeceraTabla = [
    "",
    "Codigo",
    "Nombre Completo",
    "Plan",
    "Fecha Inicio - Fin",
    "SOAT",
    "Acciones"
  ];

  const cambioIndice = (event) => {
    const value = parseInt(event.target.value);
    setIndicePagina(value);
  };

  useEffect(() => {
    obtenerPolizas()
      .then((data) => {
        setListaPolizas(data);
        const paginas = dividirPaginas(data, cantidadLineas);
        setListaPaginas(paginas);
        if (indicePagina >= paginas.length) {
          setIndicePagina(paginas.length - 1);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  
    // Restablecer el valor de actualizarLista después de la actualización
    if (actualizarLista) {
      setActualizarLista(false);
    }
  }, [cantidadLineas, indicePagina, actualizarLista]);
  


  const handlePageChange = (pageNumber) => {
    setIndicePagina(pageNumber - 1);
  };

  const cambioCantidadLineas = (event) => {
    const value = parseInt(event.target.value);
    const maxLineas = Math.min(value, 15);
    setCantidadLineas(maxLineas);
  };

  return (
    <>
      <div id='ContenedorGestionClientes'>
        <table id='TablaCLientes'>      
          <thead>            
            <tr>
              {cabeceraTabla.map(cabecera => 
                <td >{cabecera}</td>
                )}
              
            </tr>              
          </thead>

          {/* Cuerpo */}
          <tbody>
            {listaPaginas[indicePagina].slice(0, cantidadLineas).map(poliza => (
              <tr key={poliza.idPoliza}>
                {/* Cabeceras */}
                <td key={cabeceraTabla[0]}>
                  <input
                    type='checkbox'
                    checked={polizasSeleccionadas.includes(poliza.idCliente)}
                    onChange={() => seleccionCliente(poliza.idCliente)}
                  />
                </td>
                <td key={cabeceraTabla[1]}> {poliza.idPoliza} </td>
                <td key={cabeceraTabla[2]}> {poliza.idCliente} </td>
                <td key={cabeceraTabla[3]}> {poliza.idPlan} </td>
                <td key={cabeceraTabla[4]}> {poliza.fechaInicio.slice(0,10)+" - "+poliza.fechaFin.slice(0,10)} </td>
                <td key={cabeceraTabla[5]}> {typeof(poliza.fechaInicio)} </td>
                <td key={cabeceraTabla[6]}><button>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*llamamos al componente de abajo (botones y paginacion)*/}
        <BotonesYPaginacionEstandar
          cantidadLineas={cantidadLineas}
          cambioCantidadLineas={cambioCantidadLineas}
          indicePagina={indicePagina}
          handlePageChange={handlePageChange}
          listaPaginas={listaPaginas}
          listaClientes={listaPolizas}
          clientesSeleccionados={polizasSeleccionadas}
          setClientesSeleccionados={setPolizasSeleccionadas}
          actualizarLista={actualizarLista}
          setActualizarLista={setActualizarLista}
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
        />
      </div>
    </>
  );
}

export default GestionPolizas;
