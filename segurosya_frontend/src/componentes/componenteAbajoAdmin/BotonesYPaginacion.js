import React, { useRef, useState , useEffect} from 'react';
import { useForm, Controller} from 'react-hook-form';
import { useLocation } from "react-router-dom";
import './BotonesPaginacion.css';
import exportar from '../../img/Exportar.png';
import nuevo from '../../img/Nuevo.png';
import cargaMasiva from '../../img/CargaMasiva.png';
import { utils, writeFile } from 'xlsx';
import { LINKSERVER } from '../../utiles/constantes.js';
import { cargaMasivaClientesEspeciales, cargaMasivaClientesEspecialesPrueba } from './funcionesExtras';
import { obtenerDepartamentos, buscarProvinciasDep ,obtenerDistritos, consultarDNI, buscarDistritosProv} from './solicitarINformacion';




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

  const handleClientesEspecialesFile = (event) => {
    const file = event.target.files[0];
    // handleFileUpload(file);
    cargaMasivaClientesEspecialesPrueba(file)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error("Error: ",error);
    });
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
  
  const [departamento,setDepartamento] = useState();
  const [listaDepartamentos,setListaDepartamentos] = useState([]);    
  const [provincia,setProvincia] = useState();
  const [listaProvincias, setListaProvincias] = useState([]);
  const [distrito,setDistrito] = useState();
  const [listaDistritos, setListaDistritos] = useState([]);

  const ubicacion = {
      departamento: departamento,
      provincia: provincia,
      distrito: distrito
  };

  const cambioDepartamento = (idDepartamento) => {
      // const nuevoIdDepartamento = parseInt(idDepartamento);
      var nuevoDepartamento = listaDepartamentos.find( (departamento)  => departamento.idDepartamento === idDepartamento);            
      setDepartamento(nuevoDepartamento);
      buscarProvinciasDep(nuevoDepartamento.idDepartamento)
      .then(nuListaProv => {
          setListaProvincias(nuListaProv);
          setProvincia(nuListaProv[0]);

          buscarDistritosProv(nuListaProv[0].idProvincia)
          .then(nuListDists => {
              setListaDistritos(nuListDists);
              setDistrito(nuListDists[0]);
          })
      .catch(error => {
          console.error('Error:', error);
      });
          
      })
      .catch(error => {
          console.error('Error:', error);
      });
      console.log("id a cambiar: "+idDepartamento);
  };
  
  const cambioProvincia = (idProvincia) => {
    // const nuevoIdProvincia = parseInt(idProvincia);
    var nuevaProvincia = listaProvincias.find( (provincia)  => provincia.idProvincia === idProvincia);
    setProvincia(nuevaProvincia);

    buscarDistritosProv(nuevaProvincia.idProvincia)
    .then(nuListDists => {
        console.log(nuListDists);
        setListaDistritos(nuListDists);
        setDistrito(nuListDists[0]);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    // console.log("id a cambiar: "+idDepartamento);
};

  const cambioDistrito = (idDistrito) => {
      var distObtenido = listaDistritos.find( (distrito)  => distrito.idDistrito === idDistrito);
      setDistrito(distObtenido);
  };

  
  if(location.state !== null){
    //Informacion que es devuelta
    informacionClienteSinCuenta = location.state.informacionClienteSinCuenta;
  }


//   useEffect( () => {

//     // fetch data
//     obtenerDepartamentos()
//     .then( listaDeps => {
            
//             setListaDepartamentos(listaDeps);    
//             setDepartamento(listaDeps[0]);
            
//             buscarProvinciasDep(listaDeps[0].idDepartamento)
//             .then( listaProvs => {
//                     // console.log(listaProvs);
//                     setListaProvincias(listaProvs);
//                     setProvincia(listaProvs[0]);

//                     buscarDistritosProv(listaProvs[0].idProvincia)
//                     .then(listaDists => {
//                         setDistrito(listaDists[0]);
//                         setListaDistritos(listaDists);
                        
//                     })
//                     .catch( error => {
//                         console.error('Error:', error);
//                     });
                    
//                     //Temporal
                    
//             }).catch( error => {
//                 console.error('Error:', error);
//             });  

//       }).catch( error => {
//           console.error('Error:', error);
//       }); 
 
// }, [] );

  return (
    <div className="contenedorBotones">
      {/* Línea de botones */}
      <div className="botones">
        
        <button className="boton-con-icono" onClick={openModal}><img src={nuevo} alt="Icono" className="icono" />Nuevo</button>
        {isOpen && (
          <div className="nuevoModal">
            <div className="contenidoNuevoModal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>Formulario</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nombres:
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange2}
                    required
                  />
                </label>
                <label>
                  Apellido Paterno:
                  <input
                    type="text"
                    name="apellido_paterno"
                    value={formData.apellido_paterno}
                    onChange={handleInputChange2}
                    required
                  />
                </label>
                <label>
                  Apellido Materno:
                  <input
                    type="text"
                    name="apellido_materno"
                    value={formData.apellido_materno}
                    onChange={handleInputChange2}
                  />
                </label>
                <label>
                  DNI:
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    pattern="[0-9]{8}"
                    onChange={handleInputChange2}
                    required
                  />
                </label>
                <label>
                  Correo electrónico:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange2}
                    required
                  />
                </label>
                <label>
                  Teléfono celular:
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange2}
                    required
                  />
                </label>
                <label>
                  Departamento:
                  <Controller
                      name="departamento"
                      control={control}
                      render={({ field: { onChange } }) => (
                          <select onChange={(e) => {
                              onChange(e.target.value);
                              cambioDepartamento(e.target.value);
                          }}
                          className='InputUbicacion'
                          >
                          {listaDepartamentos.map((option) => (
                              <option key={option.nombre} value={option.nombre}>
                                  {option.nombre}
                              </option>
                          ))}
                          </select>
                      )}
                  />
                </label>
                <label>
                  Provincia:
                  <Controller
                      name="provincia"
                      control={control}
                      render={({ field: { onChange } }) => (
                          <select onChange={(e) => {
                              onChange(e.target.value);
                              cambioProvincia(e.target.value);
                          }}
                          className='InputUbicacion'
                          >
                          {listaProvincias.map((option) => (
                              <option key={option.nombre} value={option.nombre}>
                                  {option.nombre}
                              </option>
                          ))}
                          </select>     
                      )}
                  />
                </label>
                <label>
                  Distrito:
                  <Controller
                    name="distrito"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <select 
                            onChange={(e) => { 
                                onChange(e.target.value); 
                                cambioDistrito(e.target.value);
                            }}
                        className='InputUbicacion'
                        >
                        {listaDistritos.map((distrito) => (
                            <option key={distrito} value={distrito}>
                                {distrito}
                            </option>
                        ))}
                        </select>
                    )}  
                    />
                </label>
           

                {/* Agrega aquí los campos adicionales de tu formulario */}
                <br/>
                <br/>
                <div style={centrarBotonEnviar}>
                  <button type="submit" className='btnGeneral'>Enviar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      
        <button className="boton-con-icono" onClick={handleFileSelect}><img src={cargaMasiva} alt="Icono" className="icono" />Carga Masiva</button>
        <button className="boton-con-icono" onClick={() => handleExportarClick(listaClientes)}><img src={exportar} alt="Icono" className="icono" />Exportar</button>
        <button style={{ backgroundColor: 'var(--colorRojo)', color: 'var(--colorBlanco2)'}} onClick={handleEliminarClick}>Eliminar</button>
        <button>Clientes Especiales</button>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleClientesEspecialesFile}
        />
        {/* <form> */}
          {/* <input */}
            {/* type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            // style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleClientesEspecialesFile}
          /> */}
          {/* <button className="boton-con-icono" onClick={handleFileSelect}><img src={cargaMasiva} alt="Icono" className="icono" />Carga Masiva Clientes Especiales</button> */}
        {/* </form> */}
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
