import React from 'react';
import "./GestionClientes.css";
import '../../index.css'
import { useState, useEffect } from 'react';
import { obtenerClientes, dividirPaginas } from './funcionesExtras';
import logo from '../../img/logoNombre.png';

function GestionClientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaPaginas, setListaPaginas] = useState([[]]);
  const [indicePagina, setIndicePagina] = useState(0);

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
        setListaPaginas(dividirPaginas(data));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setIndicePagina(pageNumber - 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = listaPaginas.length;
    const maxButtons = 4; // Número máximo de botones de paginación a mostrar
    const halfMaxButtons = Math.floor(maxButtons / 2);
  
    let startPage = Math.max(indicePagina - halfMaxButtons, 0);
    let endPage = Math.min(startPage + maxButtons - 1, totalPages - 1);
    startPage = Math.max(endPage - maxButtons + 1, 0);
  
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={i === indicePagina ? "pagination-button current" : "pagination-button"}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };
  

  return (
    <>
      <div id='ContenedorGestionClientes'>
        <table id='TablaCLientes'>
          {/* Cabeceras */}
          <thead>
            <tr key={"Cabecera"}>
              {cabeceraTabla.map(cabecera => (
                <th key={cabecera}>{cabecera}</th>
              ))}
            </tr>
          </thead>
          {/* Cuerpo */}
          <tbody>
            {listaPaginas[indicePagina].map(cliente => (
              <tr key={cliente.idCliente}>
                <td key={cabeceraTabla[0]}> <input type='checkbox' /> </td>
                <td key={cabeceraTabla[1]}> {cliente.idCliente} </td>
                <td key={cabeceraTabla[2]}> {cliente.nombre + " " + cliente.apellidoPaterno + " " + cliente.apellidoMaterno} </td>
                <td key={cabeceraTabla[3]}> {cliente.dni} </td>
                <td key={cabeceraTabla[4]}><button>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="contenedorBotones">
            {/* Línea de botones */}
            <div className="botones">
            <button className="boton-con-icono"><img src={logo} alt="Icono" className="icono" />Nuevo</button>
            <button>Carga Masiva</button>
            <button>Exportar</button>
            <button>Eliminar</button>
            <button>Clientes Especiales</button>
            </div>

            {/* Paginación */}
            <div className="pagination">
            <button
                onClick={() => handlePageChange(indicePagina)}
                disabled={indicePagina === 0}
                className="pagination-button"
            >
                Anterior
            </button>
            {renderPaginationButtons()}
            <button
                onClick={() => handlePageChange(indicePagina + 2)}
                disabled={indicePagina === listaPaginas.length - 1}
                className="pagination-button"
            >
                Siguiente
            </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default GestionClientes;
