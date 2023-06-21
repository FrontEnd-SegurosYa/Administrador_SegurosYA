import React, { useRef } from 'react';
import './BotonesPaginacion.css';
import exportar from '../../img/Exportar.png';
import nuevo from '../../img/Nuevo.png';
import cargaMasiva from '../../img/CargaMasiva.png';
import { utils, writeFile } from 'xlsx';
import { LINKSERVER } from '../../utiles/constantes.js';


function BotonesYPaginacion({
  cantidadLineas,
  cambioCantidadLineas,
  indicePagina,
  handlePageChange,
  listaPaginas,
  handleFileUpload,
  listaClientes,
  clientesSeleccionados, 
  setClientesSeleccionados, 
  actualizarLista,
  setActualizarLista,
  mostrarModal,
  setMostrarModal,
}) {

    const fileInputRef = useRef(null);
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

  const handleFileSelect = () => {
    const fileInput = fileInputRef.current;
    fileInput.click();
  };

  const handleExportarClick = (listaClientes) => {
    const dataArray = Object.entries(listaClientes); 
    const worksheetData = listaClientes.map((cliente, index) => ({ Index: index + 1, ...cliente }));
    const worksheet = utils.json_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, 'listaClientes.xlsx');
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };


  const cancelarEliminar = () => {
    setMostrarModal(false);
  };
  
  const handleEliminarClick = () => {
    setMostrarModal(true);
  };

  const confirmarEliminar  = () => {
    clientesSeleccionados.forEach((idCliente) => {
      fetch(LINKSERVER+"/api/cliente/eliminar", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCliente: idCliente }),
      })
        .then((response) => response.text())
        .then((data) => {
          if(parseInt(data)===1){
            console.log(`Cliente ${idCliente} eliminado correctamente`);
          }
          else{
            console.log(`Cliente ${idCliente} no se ha eliminado`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
    
    setClientesSeleccionados([]);
    setMostrarModal(false);
    setActualizarLista(true);
  };
  

  return (
    <div className="contenedorBotones">
      {/* Línea de botones */}
      <div className="botones">
        <button className="boton-con-icono"><img src={nuevo} alt="Icono" className="icono" />Nuevo</button>
        <button className="boton-con-icono" onClick={handleFileSelect}><img src={cargaMasiva} alt="Icono" className="icono" />Carga Masiva</button>
        <button className="boton-con-icono" onClick={() => handleExportarClick(listaClientes)}><img src={exportar} alt="Icono" className="icono" />Exportar</button>
        <button style={{ backgroundColor: 'var(--colorRojo)', color: 'var(--colorBlanco2)'}} onClick={handleEliminarClick}>Eliminar</button>
        <button>Clientes Especiales</button>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleInputChange}
        />
      </div>

      {/* Modal de confirmación */}
      <div
        className={`modal ${mostrarModal ? 'show' : ''}`}
        style={{ display: mostrarModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Eliminación</h5>
              <button type="button" className="close" onClick={cancelarEliminar}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el/los cliente(s) seleccionado(s)?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={confirmarEliminar}>
                Eliminar
              </button>
              <button type="button" className="btn btn-secondary" onClick={cancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cantidadLineas">
        <label>Ver</label>
        <select value={cantidadLineas} onChange={cambioCantidadLineas}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <label>filas</label>
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
  );
}

export default BotonesYPaginacion;
