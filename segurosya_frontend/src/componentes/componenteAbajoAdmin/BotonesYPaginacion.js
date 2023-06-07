import React, { useRef } from 'react';
import './BotonesPaginacion.css';
import exportar from '../../img/Exportar.png';
import nuevo from '../../img/Nuevo.png';
import cargaMasiva from '../../img/CargaMasiva.png';
import { utils, writeFile } from 'xlsx';


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

  const handleEliminarClick = () => {
    clientesSeleccionados.forEach((idCliente) => {
      fetch(`/api/cliente/eliminar`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCliente: idCliente }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar los datos de respuesta según sea necesario
          console.log(`Cliente ${idCliente} eliminado correctamente`);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
    
    // Limpiar los clientes seleccionados después de eliminarlos
    setClientesSeleccionados([]);
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
