import React, { useRef, useState, useEffect } from 'react';
import { useForm, Controller} from 'react-hook-form';
import './BotonesPaginacion.css';
import exportar from '../../img/Exportar.png';
import nuevo from '../../img/Nuevo.png';
import cargaMasiva from '../../img/CargaMasiva.png';
import { utils, writeFile } from 'xlsx';
import { LINKSERVER } from '../../utiles/constantes.js';
import { cargaMasivaClientesEspeciales, cargaMasivaClientesEspecialesPrueba, pruebaEnvioCorreoArchivoAdjunto } from './funcionesExtras';
import { obtenerDepartamentos, buscarProvinciasDep ,obtenerDistritos, consultarDNI, buscarDistritosProv} from './solicitarInformacion';
import { useLocation } from "react-router-dom";
import { ModalCargaMasivaListaNegra, ModalEliminacionMarca } from './Modales';



function BotonesYPaginacionEstandar({
  cantidadLineas,
  cambioCantidadLineas,
  indicePagina,
  handlePageChange,
  listaPaginas,
  handleFileUpload,
  listaObjetos,
  objetosSeleccionados, 
  setObjetosSeleccionados, 
  setActualizarLista,
  mostrarModal,
  setMostrarModal,
  eliminarObjeto,
  nombreObjeto
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

  const [modalCargaMasiva,setModalCargaMasiva] = useState(false);
  const [modalEliminacion,setModalEliminacion] = useState(false);

  const [listaErroresCargaMasiva,setListaErroresCargaMasiva] = useState([]);

  const handleFileSelect = () => {
    const fileInput = fileInputRef.current;
    fileInput.click();
  };

  const handleCargaMasivaFile = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file)
    // cargaMasivaClientesEspecialesPrueba(file)
    .then(response => {
      console.log(response);
      setModalCargaMasiva(true);
      setListaErroresCargaMasiva(response);
    })
    .catch(error => {
      console.error("Error: ",error);
    });
  };

  const handleExportarClick = (listaObjetos) => {
    const dataArray = Object.entries(listaObjetos); 
    const worksheetData = listaObjetos.map((objeto, index) => ({ Index: index + 1, ...objeto }));
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
    objetosSeleccionados.forEach((objeto) => {
      eliminarObjeto(objeto)
      .then((response) => response)
      .then((data) => {
        if(parseInt(data) === 1){
          console.log(`${nombreObjeto} ${objeto} eliminado correctamente`);
        }
        else{
          console.log(`${nombreObjeto} ${objeto} no se ha eliminado`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
    
    setObjetosSeleccionados([]);
    setMostrarModal(false);
    setActualizarLista(true);
    setModalCargaMasiva(true);
  };
  
  const centrarBotonEnviar = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    dni: '',
    email: '',
    telefono: '',
    departamento: '',
    provincia: '',
    distrito: '',
  });

  const handleInputChange2 = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de envío de datos o realizar otras operaciones con los datos del formulario
    console.log(formData);
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  
  const location = useLocation();
  var informacionClienteSinCuenta = null;

  const { control, register,formState: { errors } ,setValue} = useForm();
  



  
  if(location.state !== null){
    //Informacion que es devuelta
    informacionClienteSinCuenta = location.state.informacionClienteSinCuenta;
  }


  useEffect( () => {
    // fetch data

}, [] );

  return (
    <>
      <div className="contenedorBotones">
      {/* Línea de botones */}
      <div className="botones">
        
        <button className="boton-con-icono" onClick={openModal}><img src={nuevo} alt="Icono" className="icono" />Nuevo</button>
        
      
        <button className="boton-con-icono" onClick={handleFileSelect}><img src={cargaMasiva} alt="Icono" className="icono" />Carga Masiva</button>
        <button className="boton-con-icono" onClick={() => handleExportarClick(listaObjetos)}><img src={exportar} alt="Icono" className="icono" />Exportar</button>
        {nombreObjeto!=="ClienteEspecial" ? 
          <button style={{ backgroundColor: 'var(--colorRojo)', color: 'var(--colorBlanco2)'}} onClick={handleEliminarClick}>Eliminar</button>
        :
          <></>
        }
        {/* <button style={{ backgroundColor: 'var(--colorRojo)', color: 'var(--colorBlanco2)'}} onClick={handleEliminarClick}>Eliminar</button>         */}
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleCargaMasivaFile}
        />
      </div>

      {/* Modal de confirmación */}
      <div
        className={`modal ${mostrarModal ? 'show' : ''}`}
        style={{ display: mostrarModal ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
      >
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
      {modalCargaMasiva && (
        <ModalCargaMasivaListaNegra
          listaErrores={listaErroresCargaMasiva}
          setActualizarLista={setActualizarLista}
          setMostrarModal={setModalCargaMasiva}
        />
      )}

      {modalEliminacion && (
        <ModalEliminacionMarca
          listaObjetosSeleccionados={objetosSeleccionados}
          setListaObjetosSeleccionados={setObjetosSeleccionados}
          setActualizarLista={setActualizarLista}
          setMostrarModal={setModalEliminacion}
        />
      )}


    </>
    
  );
}

export default BotonesYPaginacionEstandar;
