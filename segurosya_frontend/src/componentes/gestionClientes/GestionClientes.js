import React, { useState, useEffect } from 'react';
import './GestionClientes.css';
import '../../index.css';
import { obtenerClientes, dividirPaginas } from './funcionesExtras';
import BotonesPaginacion from '../componenteAbajoAdmin/BotonesYPaginacion'


const MAX_LINEAS_POR_PAGINA = 15;
const CANTIDAD_LINEAS_POR_DEFECTO = 10;

function GestionClientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);
  const [cantidadLineas, setCantidadLineas] = useState(CANTIDAD_LINEAS_POR_DEFECTO);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);

  const seleccionCliente = (idCliente) => {
    if (clientesSeleccionados.includes(idCliente)) {
      setClientesSeleccionados(clientesSeleccionados.filter((id) => id !== idCliente));
    } else {
      setClientesSeleccionados([...clientesSeleccionados, idCliente]);
    }
  };

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
    obtenerClientes()
      .then(data => {
        setListaClientes(data);
        const paginas = dividirPaginas(data, cantidadLineas);
        setListaPaginas(paginas);
        if (indicePagina >= paginas.length) {
          setIndicePagina(paginas.length - 1);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [cantidadLineas, indicePagina]);

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
            {listaPaginas[indicePagina].slice(0, cantidadLineas).map(cliente => (
              <tr key={cliente.idCliente}>
                {/* Cabeceras */}
                <td key={cabeceraTabla[0]}>
                  <input
                    type='checkbox'
                    checked={clientesSeleccionados.includes(cliente.idCliente)}
                    onChange={() => seleccionCliente(cliente.idCliente)}
                  />
                </td>
                <td key={cabeceraTabla[1]}> {cliente.idCliente} </td>
                <td key={cabeceraTabla[2]}> {cliente.nombre + " " + cliente.apellidoPaterno + " " + cliente.apellidoMaterno} </td>
                <td key={cabeceraTabla[3]}> {cliente.dni} </td>
                <td key={cabeceraTabla[4]}><button>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/*llamamos al componente de abajo (botones y paginacion)*/}
        <BotonesPaginacion
          cantidadLineas={cantidadLineas}
          cambioCantidadLineas={cambioCantidadLineas}
          indicePagina={indicePagina}
          handlePageChange={handlePageChange}
          listaPaginas={listaPaginas}
          listaClientes={listaClientes}
          clientesSeleccionados={clientesSeleccionados}
          setClientesSeleccionados={setClientesSeleccionados}
        />
      </div>
    </>
  );
}

export default GestionClientes;
