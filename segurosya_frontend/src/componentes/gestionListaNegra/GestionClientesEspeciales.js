import React, { useState, useEffect } from 'react';
import './GestionClientesEspeciales.css';
import '../../index.css';
import { obtenerClientesEspeciales, dividirPaginas,cargaMasivaPrueba, cargaMasivaClientesEspeciales } from './funcionesExtras';
import BotonesPaginacion from '../componenteAbajoAdmin/BotonesYPaginacion'
import BotonesYPaginacionEstandar from '../componenteAbajoAdmin/BotonesYPaginacionEstandar'


const MAX_LINEAS_POR_PAGINA = 15;
const CANTIDAD_LINEAS_POR_DEFECTO = 10;

function GestionClientesEspeciales() {
  const [listaClientesEspecialesSeleccionados, setListaClientesEspeciales] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);
  const [cantidadLineas, setCantidadLineas] = useState(CANTIDAD_LINEAS_POR_DEFECTO);
  const [clientesEspecialesSeleccionados, setClientesEspecialesSeleccionados] = useState([]);

  const [actualizarLista, setActualizarLista] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);




  const seleccionClienteEspecial = (idClienteEspecial) => {
    if (clientesEspecialesSeleccionados.includes(idClienteEspecial)) {
      setClientesEspecialesSeleccionados(clientesEspecialesSeleccionados.filter((id) => id !== idClienteEspecial));
    } else {
      setClientesEspecialesSeleccionados([...clientesEspecialesSeleccionados, idClienteEspecial]);
    }
  };

  

  const cabeceraTabla = [
    "",
    "Tipo Documento",
    "Numero Documento",
    "Nombre Completo",
    "Motivo",
    "Acciones"
  ];

  const cambioIndice = (event) => {
    const value = parseInt(event.target.value);
    setIndicePagina(value);
  };

  useEffect(() => {
    obtenerClientesEspeciales()
      .then((data) => {
        setListaClientesEspeciales(data);
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
    <div data-testid='gestionClientesEspeciales'>
      <div id='ContenedorGestionClientes'>
        <table id='TablaCLientes'>      
          <thead>            
            <tr>
              {cabeceraTabla.map(cabecera => 
                <td key={cabecera} id='CabeceraTitulo'>{cabecera}</td>
                )}
              
            </tr>              
          </thead>

          {/* Cuerpo */}
          <tbody>
            {listaPaginas[indicePagina].slice(0, cantidadLineas).map(clienteEspecial => (
              <tr key={clienteEspecial.numDoc}>
                {/* Cabeceras */}
                <td key={cabeceraTabla[0]}>
                  <input
                    type='checkbox'
                    checked={clientesEspecialesSeleccionados.includes(clienteEspecial.numDoc)}
                    onChange={() => seleccionClienteEspecial(clienteEspecial.numDoc)}
                  />
                </td>
                <td key={cabeceraTabla[1]}> {clienteEspecial.tipoDoc} </td>
                <td key={cabeceraTabla[2]}> {clienteEspecial.numDoc} </td>
                <td key={cabeceraTabla[3]}> {clienteEspecial.nombre+" "+clienteEspecial.apellidoPaterno+" "+clienteEspecial.apellidoMaterno} </td>
                <td key={cabeceraTabla[4]}> {clienteEspecial.motivo} </td>
                <td key={cabeceraTabla[5]}><button>Editar</button></td>
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
          handleFileUpload={cargaMasivaClientesEspeciales}
          listaPaginas={listaPaginas}
          listaClientes={listaClientesEspecialesSeleccionados}
          clientesSeleccionados={clientesEspecialesSeleccionados}
          setClientesSeleccionados={setClientesEspecialesSeleccionados}
          actualizarLista={actualizarLista}
          setActualizarLista={setActualizarLista}
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          eliminarObjeto={null}
          nombreObjeto={"ClienteEspecial"}
        />
      </div>
    </div>
  );
}

export default GestionClientesEspeciales;
