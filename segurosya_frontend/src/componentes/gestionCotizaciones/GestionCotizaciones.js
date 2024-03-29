import React, { useState, useEffect } from 'react';
import './GestionCotizaciones.css';
import '../../index.css';
import { obtenerCotizaciones, dividirPaginas, cargaMasivaPrueba, eliminarCotizacion } from './funcionesExtras';
import BotonesYPaginacionCotizaciones from '../componenteAbajoAdmin/BotonesYPaginacionCotizaciones'
import BotonesYPaginacionEstandar from '../componenteAbajoAdmin/BotonesYPaginacionEstandar'


const MAX_LINEAS_POR_PAGINA = 15;
const CANTIDAD_LINEAS_POR_DEFECTO = 10;

function GestionCotizaciones() {
  const [listaCotizaciones, setListaCotizaciones] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);
  const [cantidadLineas, setCantidadLineas] = useState(CANTIDAD_LINEAS_POR_DEFECTO);
  const [cotizacionesSeleccionadas, setCotizacionesSeleccionadas] = useState([]);

  const [actualizarLista, setActualizarLista] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const seleccionCotizacion = (idCotizacion) => {
    if (cotizacionesSeleccionadas.includes(idCotizacion)) {
        setCotizacionesSeleccionadas(cotizacionesSeleccionadas.filter((id) => id !== idCotizacion));
    } else {
      setCotizacionesSeleccionadas([...cotizacionesSeleccionadas, idCotizacion]);
    }
  };

  var opciones = { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 };

  const cabeceraTabla = [
    "",
    "Codigo",
    "Nombre",
    "Inspeccion V.",
    "Monto",
    "Link",
    "Acciones"
  ];  

  const cambioIndice = (event) => {
    const value = parseInt(event.target.value);
    setIndicePagina(value);
  };

  useEffect(() => {
    obtenerCotizaciones()
      .then(data => {
        setListaCotizaciones(data);
        const paginas = dividirPaginas(data, cantidadLineas);
        setListaPaginas(paginas);
        if (indicePagina >= paginas.length) {
          setIndicePagina(paginas.length - 1);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Restablecer el valor de actualizarLista después de la actualización
    if (actualizarLista) {
      setActualizarLista(false);
    }
  }, [cantidadLineas, indicePagina,actualizarLista]);

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
      <div id='ContenedorGestionCotizaciones'>
        <table id='TablaCotizaciones'>          
          {/* Cuerpo */}
          <thead>            
            <tr>
              {cabeceraTabla.map(cabecera => 
                <td key={cabecera}>{cabecera}</td>
                )}
              
            </tr>                          
          </thead>

          <tbody>
            {listaPaginas[indicePagina].slice(0, cantidadLineas).map(cotizacion => (
              <tr key={cotizacion.idCotizacion}>
                {/* Cabeceras */}
                <td key={cabeceraTabla[0]}>
                  <input
                    type='checkbox'
                    checked={cotizacionesSeleccionadas.includes(cotizacion.idCotizacion)}
                    onChange={() => seleccionCotizacion(cotizacion.idCotizacion)}
                  />
                </td>
                <td key={cabeceraTabla[1]}> {cotizacion.idCotizacion} </td>
                <td key={cabeceraTabla[2]}> {cotizacion.cliente_nombre+" "+cotizacion.cliente_apellidoPaterno+" "+cotizacion.cliente_apellidoMaterno} </td>
                <td key={cabeceraTabla[3]}> {cotizacion.tieneInsVeh === true ? "Si" : "No"} </td>
                <td key={cabeceraTabla[4]}> {cotizacion.montoPrima.toFixed(2)} </td>
                <td key={cabeceraTabla[5]}> Default </td>
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
          handleFileUpload={cargaMasivaPrueba}
          listaPaginas={listaPaginas}
          listaObjetos={listaCotizaciones}
          objetosSeleccionados={cotizacionesSeleccionadas}
          setObjetosSeleccionados={setCotizacionesSeleccionadas}
          //Pendiente
          actualizarLista={actualizarLista}
          setActualizarLista={setActualizarLista}
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          eliminarObjeto={eliminarCotizacion}
          nombreObjeto={"Cotizacion"}
        />
      </div>
    </>
  );
}

export default GestionCotizaciones;