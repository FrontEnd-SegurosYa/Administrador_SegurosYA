import React, { useRef } from 'react';
import './BotonesPaginacion.css';
import exportar from '../../img/Exportar.png';
import nuevo from '../../img/Nuevo.png';
import cargaMasiva from '../../img/CargaMasiva.png';
import { utils, writeFile } from 'xlsx';
import { LINKSERVER } from '../../utiles/constantes.js';
import { cargaMasivaClientesEspeciales } from './funcionesExtras';

function BotonesYPaginacionCotizaciones({
  cantidadLineas,
  cambioCantidadLineas,
  indicePagina,
  handlePageChange,
  listaPaginas,
  handleFileUpload,
  listaCotizaciones,
  cotizacionesSeleccionados, 
  setCotizacionesSeleccionados, 
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

  
  const handleExportarClick = (listaCotizaciones) => {
    const dataArray = Object.entries(listaCotizaciones); 
    const worksheetData = listaCotizaciones.map((cotizacion, index) => ({ Index: index + 1, ...cotizacion }));
    const worksheet = utils.json_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, 'listaCotizaciones.xlsx');
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);    
  };

  

  const handleEliminarClick = () => {
    cotizacionesSeleccionados.forEach((idCotizacion) => {
      fetch(LINKSERVER+"/api/cotizacion/eliminar", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCotizacion: idCotizacion }),
      })
        .then((response) => response.text())
        .then((data) => {
          if(parseInt(data)===1){
            console.log(`Cotizacion ${idCotizacion} eliminado correctamente`);
          }
          else{
            console.log(`Cotizacion ${idCotizacion} no se ha eliminado`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
    
    // Limpiar los clientes seleccionados después de eliminarlos
    setCotizacionesSeleccionados([]);
  };
  

  return (
    <div className="contenedorBotones">
      {/* Línea de botones */}
      <div className="botones">
        <button className="boton-con-icono"><img src={nuevo} alt="Icono" className="icono" />Nuevo</button>
        <button className="boton-con-icono" onClick={handleFileSelect}><img src={cargaMasiva} alt="Icono" className="icono" />Carga Masiva</button>
        <button className="boton-con-icono" onClick={() => handleExportarClick(listaCotizaciones)}><img src={exportar} alt="Icono" className="icono" />Exportar</button>
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

export default BotonesYPaginacionCotizaciones;
